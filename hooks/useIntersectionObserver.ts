import { RefObject, useEffect } from 'react';

export type UseIntersectionCallbackType = IntersectionObserverCallback;

const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callbackRef: RefObject<UseIntersectionCallbackType>,
  { root, rootMargin, threshold }: IntersectionObserverInit
) => {
  useEffect(() => {
    if (callbackRef.current === null || targetRef.current === null) return;

    const target = targetRef.current;
    const options = {
      root,
      rootMargin: `0px 0px -300px 0px`,
      threshold,
    };

    const observer = new IntersectionObserver(callbackRef.current, options);

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, callbackRef, root, rootMargin, threshold]);

  return callbackRef;
};

export default useIntersectionObserver;
