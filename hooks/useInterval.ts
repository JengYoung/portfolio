import { useEffect, useRef } from 'react';

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<typeof callback>(callback);
  const timerId = useRef<undefined | null | NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    timerId.current = setInterval(tick, delay);

    return () => clearInterval(timerId.current as NodeJS.Timeout);
  }, [delay, savedCallback, timerId]);

  return { timerId, savedCallback };
};

export default useInterval;
