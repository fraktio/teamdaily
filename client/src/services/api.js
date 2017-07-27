import moment from 'moment';
import axios from 'axios';
import uuid from 'uuid';
import { List } from 'immutable';

const url = url => process.env.API + url;

const wrapMany = req => req.then(res => List(res.data));

axios.defaults.withCredentials = true;

export default {
  getEntries: date =>
    wrapMany(axios.get(url('/api/message/') + date.format('GGGG') + '/' + date.format('WW'))),

  submitStatus: (status, date) => {
    const json = {
      message: status.description,
      name: status.name,
      employeeId: status.employeeId,
      color: status.color,
      activeProjects: status.activeProjects.filter(Boolean),
      flagged: status.flagged,
    };

    return axios
      .post(url(`/api/message/${date.format('GGGG')}/${date.format('WW')}`), json)
      .then(res => res.data)
      .then(data => ({
        ...json,
        uuid: uuid.v4(),
        created: moment(),
      }));
  },

  getYearlyStats: year => wrapMany(axios.get(url('/api/message/latest'))),

  getEmployees: () => wrapMany(axios.get(url('/api/employee'))),

  getProjects: () => wrapMany(axios.get(url('/api/project'))),

  addProject: project => axios.post(url('/api/project'), { project }),

  deleteProject: id => axios.post(url('/api/deleteproject'), { id }),

  addEmployee: employee => axios.post(url('/api/employee'), { employee }),

  deleteEmployee: id => axios.post(url('/api/deleteemployee'), { id }),

  saveProject: (employeeId, projectId, newProjectState) =>
    axios.post(url('/api/saveemployeeproject'), { employeeId, projectId, newProjectState }),

  getEmployeeProjects: () => wrapMany(axios.get(url('/api/employeeprojects'))),
};
