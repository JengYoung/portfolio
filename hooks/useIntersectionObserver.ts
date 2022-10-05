import { RefObject, useEffect } from 'react';

type CallbackType = IntersectionObserverCallback;
const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callbackRef: RefObject<CallbackType>,
  { root, rootMargin, threshold }: IntersectionObserverInit
) => {
  useEffect(() => {
    if (callbackRef.current === null || targetRef.current === null) return;

    const target = targetRef.current;
    const options = { root, rootMargin, threshold };

    const observer = new IntersectionObserver(callbackRef.current, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, callbackRef, root, rootMargin, threshold]);

  return callbackRef;
};

export default useIntersectionObserver;
