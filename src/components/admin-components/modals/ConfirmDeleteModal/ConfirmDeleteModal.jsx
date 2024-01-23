import CloseIcon from '@/components/Icons/CloseIcon';
import { useModal } from '@/store/modalStore';
import styles from './ConfirmDeleteModa.module.scss';

const ConfirmDeleteModal = ({ handleDelete }) => {
  const { closeModal } = useModal();

  return (
    <div className={styles.deleteModal}>
      <div className={styles.contentWrapper}>
        <div className={styles.close} onClick={() => closeModal()}>
          <CloseIcon />
        </div>

        <p>Ви дійсно бажаєте видалити?</p>
        <div className={styles.buttonsWrapper}>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            Відміна
          </button>
          <button onClick={handleDelete}>Видалити</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
