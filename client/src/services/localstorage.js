const storage = window.localStorage || {
  setItem() {},
  getItem() {}
};

const statusFromLocalStorage = ({ name, description, color, flagged, employeeId, activeProjects }) => ({
  name: name || '',
  description: description || '',
  color: color || 'green',
  flagged: flagged || false,
  activeProjects: activeProjects || [],
  employeeId: employeeId || undefined
});

export default {
  save(status) {
    return storage.setItem('status', JSON.stringify(status));
  },

  load() {
    const ret = storage.getItem('status');
    const json = ret ? JSON.parse(ret) : {};
    return statusFromLocalStorage(json);
  }
};
