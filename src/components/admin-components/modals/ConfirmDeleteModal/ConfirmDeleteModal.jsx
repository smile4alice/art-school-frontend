import CloseIcon from '@/components/Icons/CloseIcon';
import { useRef } from 'react';
import { useModal } from '@/store/modalStore';
import { useClickOutside } from '@/hooks/hooks';
import styles from './ConfirmDeleteModa.module.scss';

const ConfirmDeleteModal = ({ handleDelete }) => {
  const { isModalOpen, closeModal } = useModal();
  const modalRef = useRef();
  useClickOutside([modalRef], ()=>{
    if(isModalOpen){
      closeModal()
    }
  })
  return (
    <div className={styles.deleteModal} ref={modalRef}>
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
