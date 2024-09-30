export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null;
  
    return (...args: Parameters<T>) => {
      if (timer) {
        clearTimeout(timer);
      }
  
      timer = setTimeout(() => {
        fn(...args);
      }, delay);
    };
  };
  
  export const debounced = debounce((dispatch: () => void) => {
    dispatch();
  }, 300);
  