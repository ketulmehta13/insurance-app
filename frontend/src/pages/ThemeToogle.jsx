import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setDark((d) => !d)}
      className="rounded-full p-2 bg-cyan-100 hover:bg-cyan-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-all duration-300"
    >
      {dark ? (
        <Sun size={22} className="text-cyan-600 dark:text-cyan-400" />
      ) : (
        <Moon size={22} className="text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;
