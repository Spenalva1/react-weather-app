import { useEffect } from 'react';

export default function (fn: (width: number) => void) {
  useEffect(() => {
    window.addEventListener('resize', () => fn(window.innerWidth));
    return () => {
      window.removeEventListener('resize', () => fn(window.innerWidth));
    };
  }, [fn]);
}
