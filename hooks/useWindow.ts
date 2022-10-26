import { useLayoutEffect, useState } from 'react';

const useWindow = () => {
  const [windowState, setWindowState] = useState({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    setWindowState((state) => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight,
    }));
  }, []);

  return { windowState, setWindowState };
};

export default useWindow;
