import Container from '@/components/Container/Container';
import { useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';
import SEO from '@/components/SEO';
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
    <>
    <SEO
        title="Документи КДШМ №2 ім. М.І.Вериківського"
        description="Документи Київської Дитячої Школи Мистецтв №2 ім. М.І.Вериківського"
      />
      <section>
        <Container>        
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
       </Container>
    </section>
    </>
  );
};

export default SchoolDocuments;
