import styles from './ButtonSubmit.module.scss';

export const ButtonSubmit = ({
  handlerSubmitButton,
  nameButton,
  isActive,
  isRight,
}) => {
  const buttonClass = isActive ? styles.activeButton : styles.inactiveButton;
  const additionalClass = isRight ? styles.rightButton : '';

  return (
    <button
      type="submit"
      onClick={isActive ? handlerSubmitButton : null}
      className={`${styles.button} ${buttonClass} ${additionalClass}`}
    >
      {nameButton}
    </button>
  );
};

export default ButtonSubmit;
