import { useEffect } from 'react';

import { UseResizeInterface } from './types';
import useWindow from './useWindow';

const useResize = () => {
  const { windowState, setWindowState } = useWindow<UseResizeInterface>([
    'innerWidth',
    'innerHeight',
  ]);

  useEffect(() => {
    const setState = () => {
      setWindowState((state) => ({
        ...state,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      }));
    };

    window.addEventListener('resize', setState);
    return () => {
      window.removeEventListener('resize', setState);
    };
  }, [setWindowState]);

  return { windowState };
};

export default useResize;
