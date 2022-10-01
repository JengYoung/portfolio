import { useEffect, useRef } from 'react';

const useInterval = (callback: () => any, delay: number) => {
  const savedCallback = useRef<typeof callback>(callback);
  const timerId = useRef<undefined | null | NodeJS.Timeout>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    timerId.current = setInterval(tick, delay);
    console.log('hihihi', timerId);
    return () => clearInterval(timerId.current as NodeJS.Timeout);
  }, [delay]);

  return timerId;
};

export default useInterval;
