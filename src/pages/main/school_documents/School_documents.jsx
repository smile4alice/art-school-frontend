import { useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';
import styles from './School_documents.module.scss';

const SchoolDocuments = () => {
  const { getDocuments } = useDocumentsStore();
  const documents = useDocumentsStore(state => state.documents);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDocuments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDocuments]);

  return (
    <section className={styles.schoolDocuments}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.documentsTitle}>Документи школи</h1>
        <ul className={styles.documentsList}>
          {documents.map((document, index) => (
            <li key={index}>
              <a
                className={styles.documentLink}
                href={index > 0 && document.doc_path}
                target="_blank"
                rel="noreferrer"
              >
                {index > 0 && document.doc_name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SchoolDocuments;
