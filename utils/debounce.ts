/* eslint-disable-next-line no-unused-vars */
let timerFunc: null | NodeJS.Timeout = null;
const debounce =
  (cb: Function, delay = 300) =>
  (e: Event) => {
    if (timerFunc) clearTimeout(timerFunc);
    timerFunc = setTimeout(cb, delay, e) as unknown as NodeJS.Timeout;
  };

export default debounce;
