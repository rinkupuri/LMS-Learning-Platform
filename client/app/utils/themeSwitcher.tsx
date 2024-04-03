"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {};

const ThemeSwitcher = (props: Props) => {
  const [mount, setMount] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <div>
      {theme === "dark" ? (
        <BiSun
          size={30}
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
      ) : (
        <BiMoon
          size={30}
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
