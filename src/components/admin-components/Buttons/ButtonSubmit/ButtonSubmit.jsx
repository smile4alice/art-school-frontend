import React from "react";
import styles from "./ButtonSubmit.module.scss";

export const ButtonSubmit = ({ handlerSubmitButton, nameButton, isActive }) => {
  const buttonClass = isActive ? styles.activeButton : styles.inactiveButton;

  return (
    <button
      onClick={isActive ? handlerSubmitButton : null}
      className={`${styles.button} ${buttonClass}`}
    >
      {nameButton}
    </button>
  );
};
export default ButtonSubmit;
