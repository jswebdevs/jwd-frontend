// hooks/useDarkMode.js
import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [isDark, setIsDark] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    const changeHandler = (e) => setIsDark(e.matches);
    matcher.addEventListener("change", changeHandler);
    return () => matcher.removeEventListener("change", changeHandler);
  }, []);

  return isDark;
};

export default useDarkMode;
