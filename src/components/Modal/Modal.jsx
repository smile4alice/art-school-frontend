import styles from './Modal.module.scss'

const Modal = ({ closeModal }) => {
  return (
    <div className={styles.Modal}>
      Modal
      <button onClick={closeModal}>close modal</button>
    </div>
  );
};

export default Modal;
