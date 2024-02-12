import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import CloseIcon from '@/components/Icons/CloseIcon';
import CloseIconAccent from '@/components/Icons/CloseIconAccent';
import { useClickOutside, useBodyScrollLockRight} from '@/hooks/hooks';
import { useModal } from '@/store/modalStore';
const Modal = ({ children, accentIcon }) => {
  const { isModalOpen, closeModal } = useModal();
  const modalRef = useRef();
  useClickOutside([modalRef], () => {
    if (isModalOpen) {
      closeModal();
    }
  });
  useBodyScrollLockRight(isModalOpen);
  useEffect(() => {
    const handleEscKeyDown = event => {
      if (event.code === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={styles.Overlay} ref={modalRef} onClick={() => closeModal()}>
      <div className={styles.Modal}>{children}</div>
      <div className={styles.close} onClick={() => closeModal()}>
        {accentIcon ? <CloseIconAccent/> : <CloseIcon /> }
      </div>
    </div>
  );
};

export default Modal;
