import { useState } from 'react';
import { Link } from 'react-router-dom';
import useSlidersStore from '@/store/slidersStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import { subString } from '@/utils/subString';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal/ConfirmDeleteModal';
import styles from './SlidersTable.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';
import SpinnerAdmin from '../../SpinnerAdmin/SpinnerAdmin';

const SlidersTable = ({ data }) => {
  const { deleteSlide } = useSlidersStore();
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');
  const loading = useSlidersStore(state => state.loading);

  const removePost = async () => {
    if (isDeleteConfirm && data.length > 1) {
      try {
        await deleteSlide(currentId);
      } catch (error) {
        console.log(error);
      }
    } else {
      closeModal();
    }
  };

  if (loading) return <SpinnerAdmin />;

  return (
    <div className={styles.contentWrap}>
      <ul className={styles.tableHeader}>
        <li className={styles.cellSlideyHeader}>Слайди</li>
        <li className={styles.cellHeadingHeader}>Заголовок</li>
        <li className={styles.cellTextHeader}>Текст</li>
        <li className={styles.cellPhotoHeader}>Фото</li>
        <li className={styles.cellActionHeader}>Дія</li>
      </ul>
      {data &&
        Array.isArray(data) &&
        data.map((item, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={styles.cellSliderRow}>{index + 1}</div>
            <div className={styles.cellHeadingRow}>{item.title}</div>
            <div className={styles.cellTextRow}>
              {subString(item.description)}
            </div>
            <div className={styles.cellPhotoRow}>
              <img
                src={item.photo}
                alt={item.title}
                className={styles.contentElementImg}
              />
            </div>

            <div className={styles.cellActionRow}>
              <Link to={`edit/${item.id}`}>
                <div className={styles.cellActionContainer}>
                  <svg className={styles.iconEdit}>
                    <use href={`${sprite}#icon-edit`} width="20" height="20" />
                  </svg>
                </div>
              </Link>

              <button
                className={styles.cellActionContainer}
                onClick={openModal}
              >
                <svg
                  className={styles.iconTrash}
                  onClick={() => setCurrentId(item.id)}
                >
                  <use href={`${sprite}#icon-trash`} width="20" height="20" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};
export default SlidersTable;
