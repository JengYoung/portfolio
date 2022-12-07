import { RefObject, useEffect, useRef } from 'react';

const events = ['mousedown', 'touchstart'];

const useClickAway = <R extends Element, F extends Function>(ref: RefObject<R>, handler: F) => {
  const savedHandler = useRef<Function>(handler);

  useEffect(() => {
    savedHandler.current = handler; // 핸들러 함수가 변하더라도 다시 지우고 이벤트를 추가시키지 않도록 함.
  }, [handler]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEvent = (e: any) => {
      if (!element.contains(e.target)) {
        savedHandler.current(e);
      }
    };

    events.forEach((eventName) => {
      document.body.addEventListener(eventName, handleEvent);
    });

    return () => {
      events.forEach((eventName) => {
        document.body.removeEventListener(eventName, handleEvent);
      });
    };
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [ref.current]);

  return ref;
};

export default useClickAway;
