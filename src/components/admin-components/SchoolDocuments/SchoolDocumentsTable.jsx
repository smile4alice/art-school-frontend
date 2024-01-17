import { Link } from 'react-router-dom';
import styles from './SchoolDocumentsTable.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';
import { useState } from 'react';
import useDocumentsStore from '@/store/documentsStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';

const SchoolDocumentsTable = ({ data }) => {
  const { deleteDocument } = useDocumentsStore();
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');

  const removePost = async () => {
    if (isDeleteConfirm) {
      try {
        await deleteDocument(currentId);
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
        <li className={styles.cellHeadingHeader}>Назва документу</li>
        <li className={styles.cellActionHeader}>Дія</li>
      </ul>
      <div className={styles.tbody}>
        {data.map((item, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={styles.cellHeadingRow}>{item.doc_name}</div>

            <div className={styles.cellActionRow}>
              <Link to={`edit/${item.id}`} state={{ value: data[index] }}>
                <div className={styles.cellActionContainer}>
                  <svg className={styles.iconEdit}>
                    <use href={`${sprite}#icon-edit`} width="20" height="20" />
                  </svg>
                </div>
              </Link>

              <button
                onClick={() => {
                  setCurrentId(item.id);
                  openModal();
                }}
                className={
                  index === 0 ? styles.disabled : styles.cellActionContainer
                }
                disabled={index === 0}
              >
                <svg
                  className={index === 0 ? styles.disabled : styles.iconTrash}
                >
                  <use href={`${sprite}#icon-trash`} width="20" height="20" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};
export default SchoolDocumentsTable;
