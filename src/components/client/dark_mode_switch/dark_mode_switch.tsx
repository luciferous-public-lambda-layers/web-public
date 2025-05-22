"use client";

import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useEffect, useState } from "react";

import Styles from "./dark_mode_switch.module.css";

function detectPrefersDarkMode(): boolean {
  const match = window.matchMedia("(prefers-color-scheme: dark)");
  return match.matches;
}

function applyDarkMode(isDarkMode: boolean) {
  const elm = document.getElementsByTagName("html")[0];
  elm.setAttribute("data-theme", isDarkMode ? "dark" : "light");
}

export function DarkModeSwitch() {
  const [isFirst, setIsFirst] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isFirst) {
      setIsFirst(false);
      setIsDarkMode(detectPrefersDarkMode());
    }
  }, [isFirst, isDarkMode]);

  useEffect(() => applyDarkMode(isDarkMode), [isDarkMode]);

  return (
    <span
      className={classNames("icon", "mr-5", Styles.SwitchIcon)}
      onClick={() => setIsDarkMode(!isDarkMode)}
    >
      <FontAwesomeIcon icon={isDarkMode ? faMoon : faSun} />
    </span>
  );
}
