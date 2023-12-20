import { useState } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import { subString } from '@/utils/subString';
import styles from './DepartmentsTable.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal/ConfirmDeleteModal';

const DepartmentsTable = ({ data }) => {
  const { deletePost } = useNewsStore();
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');

  const removePost = async () => {
    if (isDeleteConfirm) {
      try {
        await deletePost(currentId);
      } catch (error) {
        console.log(error);
      }
    } else {
      closeModal();
    }
  };

  return (
    <div className={styles.contentWrap}>
      <ul className={styles.tableHeader}>
        <li className={styles.cellHeadingHeader}>Відділ</li>
        <li className={styles.cellTextHeader}>Опис</li>
        <li className={styles.cellActionHeader}>Дія</li>
      </ul>
      {data &&
        Array.isArray(data) &&
        data.map((item, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={styles.cellHeadingRow}>
              {item.sub_department_name}
            </div>
            <div className={styles.cellTextRow}>
              {subString(item.description)}
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
                onClick={openModal}
                className={styles.cellActionContainer}
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
export default DepartmentsTable;
