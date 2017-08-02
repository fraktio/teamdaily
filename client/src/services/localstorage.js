const storage = window.localStorage || {
  setItem() {},
  getItem() {},
};

const statusFromLocalStorage = ({ selectedPersonId, message, color, flagged }) => ({
  selectedPersonId: selectedPersonId || null,
  message: message || '',
  color: color || 'green',
  flagged: flagged || false,
});

export default {
  save(status) {
    return storage.setItem('status', JSON.stringify(Object.assign({}, this.load(), status)));
  },

  load() {
    const status = storage.getItem('status');
    const json = status ? JSON.parse(status) : {};

    return statusFromLocalStorage(json);
  },
};
