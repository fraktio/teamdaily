const storage = window.localStorage || {
  setItem() {},
  getItem() {}
};

const defaults = {
  'name': '',
  'description': '',
  'color': 'green',
  'flagged': false
};

export default {
  save(status) {
    return storage.setItem('status', JSON.stringify(status));
  },

  load() {
    const ret = storage.getItem('status');
    return ret ? JSON.parse(ret) : defaults;
  }
};
