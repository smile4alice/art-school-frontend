import styles from './ConfirmModal.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';

const ConfirmModal = ({ message, handleClick }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.contentWrapper}>
        <p>{message}</p>
        <svg>
          <use href={`${sprite}#icon-success`} width="90" height="90" />
        </svg>
        <button
          onClick={() => {
            handleClick();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
