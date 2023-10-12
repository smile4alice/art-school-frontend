import styles from './Header.module.scss';
import { useModal } from '@/store/modalStore';
import Modal from '@/components/Modal/Modal';

const Header = () => {
  const isModalOpen = useModal(store => store.isModalOpen);
  const openModal = useModal(store => store.openModal);
  const closeModal = useModal(store => store.closeModal);

  return (
    <div className={styles.Header}>
      <h1>Header</h1>
      <button onClick={openModal}>open modal</button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default Header;
