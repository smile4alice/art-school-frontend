import { Link } from 'react-router-dom';
import sprite from '@/assets/icons/sprite-admin.svg';
import { useState, useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';
import { useModal } from '@/store/modalStore';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import styles from './SchoolDocumentsTable.module.scss';

const SchoolDocumentsTable = ({ data }) => {
  const { deleteDocument, getApplication } = useDocumentsStore();
  const [application, setApplication] = useState([]);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getApplication();
        setApplication(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getApplication]);

  console.log(application);

  const removePost = async () => {
    try {
      await deleteDocument(currentId);
      closeModal();
    } catch (error) {
      console.log(error);
    } finally {
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
        {application && (
          <div className={styles.tableRow}>
            <div className={styles.cellHeadingRow}>{application.doc_name}</div>
            <div className={styles.cellActionRow}>
              <Link
                to={`edit/${application.id}`}
                state={{ value: application }}
              >
                <div className={styles.cellActionContainer}>
                  <svg className={styles.iconEdit}>
                    <use href={`${sprite}#icon-edit`} width="20" height="20" />
                  </svg>
                </div>
              </Link>

              <button
                onClick={() => {
                  setCurrentId(application.id);
                  openModal();
                }}
                className={styles.disabled}
                disabled
              >
                <svg className={styles.disabled}>
                  <use href={`${sprite}#icon-trash`} width="20" height="20" />
                </svg>
              </button>
            </div>
          </div>
        )}

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
                className={styles.cellActionContainer}
              >
                <svg className={styles.iconTrash}>
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
