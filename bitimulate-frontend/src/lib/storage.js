export default (function() {
  const storage = localStorage || {};
  return {
    set: (key, object) => {
      storage[key] = (typeof object) === 'string' ? object : JSON.stringify(object);
    },
    get: (key) => {
      if(!storage[key]) {
        return null;
      }
      const value = storage[key];

      try {
        const parsed = JSON.parse(value);
        return parsed;
      } catch(e) {
        return value;
      }
    },
    remove: (key) => {
      if(localStorage) {
        return localStorage.removeItem(key);
      }
      delete storage[key];
    }
  }
})();