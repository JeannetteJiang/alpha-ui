import React from 'react';

export const useMountEffect = (fn) => React.useEffect(fn, []);
export const useUpdateEffect = (fn, deps?) => {
  const mounted = React.useRef(false);
  return React.useEffect(() => {
      if (!mounted.current) {
          mounted.current = true;
          return;
      }

      return fn && fn();
  }, deps);
}
export const usePrevious = (newValue) => {
  const ref = React.useRef(undefined);
  React.useEffect(() => {
      ref.current = newValue;
  });
  return ref.current;
}
