const throttle = (cb: Function, delay = 300) => {
  let timerFunc: null | NodeJS.Timeout = null;

  return (...args: any) => {
    if (timerFunc) return;

    timerFunc = setTimeout(() => {
      cb(...args);
      timerFunc = null;
    }, delay);
  };
};

export default throttle;
