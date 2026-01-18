import { useEffect, useState } from "react";

// TODO: перенести в shared/hooks
function useDebounceValue<T>(value: T, ms = 500) {
  const [debounce, setDebounce] = useState<T>(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounce(value), ms);
    return () => clearTimeout(t);
  }, [value, ms]);

  return debounce;
}

export default useDebounceValue;
