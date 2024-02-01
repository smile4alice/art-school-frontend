import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import CloseIcon from '@/components/Icons/CloseIcon';
import { useClickOutside } from '@/hooks/hooks';
import { useModal } from '@/store/modalStore';
const Modal = ({ children }) => {
  const { isModalOpen, closeModal, openModal } = useModal();
  const modalRef = useRef();
  useClickOutside([modalRef], () => {
    if (isModalOpen) {
      closeModal();
    }
  });

  useEffect(() => {
    const handleEscKeyDown = event => {
      if (event.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, []);

  return (
    <div className={styles.Overlay} ref={modalRef} onClick={() => closeModal()}>
      <div className={styles.Modal}>{children}</div>
      <div className={styles.close} onClick={() => closeModal()}>
        <CloseIcon />
      </div>
    </div>
  );
};

export default Modal;
