import { useEffect, useRef } from 'react';
import styles from './Modal.module.scss';
import CloseIcon from '@/components/Icons/CloseIcon';
import CloseIconAccent from '@/components/Icons/CloseIconAccent';
import { useClickOutside} from '@/hooks/hooks';

const Modal = ({ children, accentIcon, isModalOpen, closeModal }) => {
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
  }, [closeModal]);

  return (
    <div className={styles.Overlay}  onClick={() => closeModal()}>
      <div ref={modalRef} className={styles.Modal}>{children}</div>
      <div className={styles.close} onClick={() => closeModal()}>
        {accentIcon ? <CloseIconAccent/> : <CloseIcon /> }
      </div>
    </div>
  );
};

export default Modal;
