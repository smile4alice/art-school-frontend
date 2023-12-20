import styles from './PasswordRecoveryAlert.module.scss';

const PasswordRecoveryAlert = ({ setIsSubmitted }) => {
  return (
    <div className={styles.modalStyle} onClick={() => setIsSubmitted(false)}>
      <p className={styles.headingStyle}>Відновлення паролю</p>
      <div className={styles.popUpStyle}>
        <img src="/icons/icon-success.svg" alt="" width="60" />
        <p className={styles.textStyle}>
          Якщо введена вами адреса знаходиться у базі зареєстрованих
          користувачів, ми надішлемо на цю адресу повідомлення. Воно буде
          містити посилання для скидання пароля.
        </p>
      </div>
    </div>
  );
};

export default PasswordRecoveryAlert;
