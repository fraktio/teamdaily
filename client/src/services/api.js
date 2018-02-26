import moment from "moment";
import axios from "axios";
import uuid from "uuid";
import { List } from "immutable";
import auth from "./auth";

console.log(process.env);

const url = url => process.env.REACT_APP_API + url;

const wrapMany = req => req.then(res => List(res.data));

axios.interceptors.request.use(config => {
  if (!auth.isEnabled) {
    return config;
  }

  return auth.firebaseApp
    .auth()
    .currentUser.getIdToken()
    .then(token => {
      return {
        ...config,
        headers: {
          "X-Firebase-Token": token
        }
      };
    });
});

export default {
  getEntries: date =>
    wrapMany(
      axios.get(
        url("/api/message/") + date.format("GGGG") + "/" + date.format("WW")
      )
    ),

  submitStatus: (status, date) => {
    const json = {
      message: status.description,
      name: status.name,
      employeeId: status.employeeId,
      color: status.color,
      activeProjects: status.activeProjects.filter(Boolean),
      flagged: status.flagged
    };

    return axios
      .post(
        url(`/api/message/${date.format("GGGG")}/${date.format("WW")}`),
        json
      )
      .then(res => res.data)
      .then(data => ({
        ...json,
        uuid: uuid.v4(),
        created: moment()
      }));
  },

  getYearlyStats: year => wrapMany(axios.get(url("/api/message/latest"))),

  getEmployees: () => wrapMany(axios.get(url("/api/employee"))),

  getProjects: () => wrapMany(axios.get(url("/api/project"))),

  addProject: project => axios.post(url("/api/project"), { project }),

  deleteProject: id => axios.post(url("/api/deleteproject"), { id }),

  addEmployee: employee => axios.post(url("/api/employee"), { employee }),

  deleteEmployee: id => axios.post(url("/api/deleteemployee"), { id }),

  saveProject: (employeeId, projectId, newProjectState) =>
    axios.post(url("/api/saveemployeeproject"), {
      employeeId,
      projectId,
      newProjectState
    }),

  updateProject: project => axios.put(url("/api/project"), project),

  getEmployeeProjects: () => wrapMany(axios.get(url("/api/employeeprojects")))
};
