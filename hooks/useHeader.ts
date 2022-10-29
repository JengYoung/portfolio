import { useEffect, useRef, useState } from 'react';

const useHeader = () => {
  const scrollTop = useRef(0);
  const [isScrollDown, setIsScrollDown] = useState(false);

  const handleScroll = () => {
    const nowScroll = document.documentElement.scrollTop;
    if (nowScroll > scrollTop.current) {
      setIsScrollDown(() => true);
    } else {
      setIsScrollDown(() => false);
    }

    scrollTop.current = document.documentElement.scrollTop;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isScrollDown };
};

export default useHeader;
