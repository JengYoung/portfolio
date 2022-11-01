import { RefObject, useEffect } from 'react';

export type UseIntersectionCallbackType = IntersectionObserverCallback;

const useIntersectionObserver = (
  targetRef: RefObject<Element>,
  callbackRef: RefObject<UseIntersectionCallbackType>,
  { root, rootMargin, threshold }: IntersectionObserverInit
) => {
  useEffect(() => {
    if (callbackRef.current === null || targetRef.current === null) return undefined;
    const target = targetRef.current;

    const observer = new IntersectionObserver(callbackRef.current, {
      root,
      rootMargin,
      threshold,
    });

    observer.observe(target);

    /*  */
    return () => {
      observer.disconnect();
    };
  }, [targetRef, callbackRef, root, rootMargin, threshold]);

  return callbackRef;
};

export default useIntersectionObserver;
