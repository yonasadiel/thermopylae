import { DependencyList, useCallback, useRef } from 'react';

const useDebounceFn = (fn: Function, delayMs: number, deps: DependencyList): Function => {
    const timeout = useRef<number | null>(null);
  
    const trigger = (...args: any) => {
        const later = () => {
            timeout.current && clearTimeout(timeout.current);
            fn(...args);
        };
    
        timeout.current && clearTimeout(timeout.current);
        timeout.current = setTimeout(later, delayMs);
    };
    return useCallback(trigger, deps);
}

export default useDebounceFn;
