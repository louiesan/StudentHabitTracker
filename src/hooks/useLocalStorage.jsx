import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialState) {
  const [local, setLocal] = useState(() => {
    try {
      const condi = window.localStorage.getItem(key);
      return condi ? JSON.parse(condi) : initialState;
    } catch (e) {
      console.log(e, "Has been Occured!");
      return initialState;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(local));
    } catch (e) {
      console.log(e, "has Occured");
      window.localStorage.setItem(key, initialState);
    }
  }, [key, local]);

  return [local, setLocal];
}
