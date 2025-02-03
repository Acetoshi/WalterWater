import { useEffect, useRef } from 'react';

function useEffectSkipFirstRender(callback: () => void, dependencies: React.DependencyList) {
  const hasRendered = useRef(false);

  useEffect(() => {
    if (hasRendered.current) {
      callback();
    } else {
      hasRendered.current = true;
    }
  }, dependencies);
}

export default useEffectSkipFirstRender;
