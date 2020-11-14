import { useEffect, useRef } from 'react';

function useInfiniteScroll(checkIntersect) {
  const ref = useRef(null);

  useEffect(() => {
    let observer;
    if (ref.current) {
      observer = new IntersectionObserver(checkIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      });
      observer.observe(ref.current);
    }
    return () => observer && observer.disconnect();
  }, [checkIntersect]);

  return { ref };
}

export default useInfiniteScroll;
