import styles from './ButtonSubmit.module.scss';

export const ButtonSubmit = ({
  handlerSubmitButton,
  nameButton,
  isActive,
  isRight,
  isProcessing,
}) => {
  const active = !!isActive;
  const buttonClass = active ? styles.activeButton : styles.inactiveButton;
  const additionalClass = isRight ? styles.rightButton : '';
  const inProcess = isProcessing ? styles.inProcess : '';

  return (
    <button
      disabled={!active || isProcessing}
      onClick={active ? handlerSubmitButton : null}
      className={`${styles.button} ${buttonClass} ${additionalClass} ${inProcess}`}
    >
      {isProcessing ? 'Обробка запиту...' : nameButton}
    </button>
  );
};

export default ButtonSubmit;
