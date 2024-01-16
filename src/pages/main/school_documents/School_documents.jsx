import { useEffect } from 'react';
import styles from './School_documents.module.scss';
const SchoolDocuments = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className={styles.schoolDocuments}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.documentsTitle}>Документи школи</h1>
        <ul className={styles.documentsList}>
          <li>
            <a
              className={styles.documentLink}
              href="https://docs.google.com/document/d/1Iv-zBovHbYAs4rP8MiuL9ZkWLIy0u10m/edit?usp=sharing&ouid=110653849801307189044&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
            >
              {`Наказ "Про надання платних послугшколою у 2023-2024 році"`}
            </a>
          </li>
          <li>
            <a
              className={styles.documentLink}
              href="https://drive.google.com/file/d/1lqtYZ9tw65CSisdpHt250Ixpe1iXb8T8/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              Виписка з ЄДРЮ
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default SchoolDocuments;
