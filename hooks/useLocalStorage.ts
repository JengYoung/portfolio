import { useEffect, useState } from 'react';

export const useLocalStorage = () => {
  const [localStorage, setLocalStorage] = useState<null | Storage>(null);

  useEffect(() => {
    setLocalStorage(() => window.localStorage);
  }, []);

  const getItem = (key: string, defaultValue?: any) => {
    if (!localStorage) return defaultValue;

    try {
      const result = JSON.parse(localStorage.getItem(key) as string) ?? defaultValue;
      return result;
    } catch (e) {
      return Error(e as string);
    }
  };

  const setItem = (key: string, value: any) => {
    try {
      if (!localStorage) return false;

      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  };

  return { getItem, setItem, localStorage };
};
