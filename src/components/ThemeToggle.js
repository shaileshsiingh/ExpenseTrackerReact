// ThemeToggle.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store1/themeReducer";

const ThemeToggle = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  const toggleTheme = () => {
    dispatch(themeActions.toggleDarkMode());
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
    </button>
  );
};

export default ThemeToggle;
