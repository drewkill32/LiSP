import { useEffect, useState } from "react";

export const useLocalStorageState = <T>(
  key: string,
  defaultValue: T,
  convertFunc?: (value: T) => any,
  restoreFunc?: (value: any) => T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      const parsedValue = JSON.parse(valueInLocalStorage);
      if (typeof restoreFunc === "function") {
        return restoreFunc(parsedValue);
      } else {
        return parsedValue as T;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    if (state === null || state === undefined) {
      window.localStorage.removeItem(key);
    } else {
      let value = state;
      if (typeof convertFunc === "function") {
        value = convertFunc(value);
      }
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, state, convertFunc, defaultValue]);

  return [state, setState];
};
