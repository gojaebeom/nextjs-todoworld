export default function useStorage() {
  const getStorage = (name) => {
    const item = window.localStorage.getItem(name);
    if (!item) return null;
    return item;
  };

  const setStorage = (name, data) => {
    window.localStorage.setItem(name, data);
  };

  const destroyStorage = (name) => {
    window.localStorage.removeItem(name);
  };

  return {
    getStorage,
    setStorage,
    destroyStorage,
  };
}
