import { Link } from 'react-router-dom';
// import { dataKeys } from './dataKeys';
import styles from './SchoolDocuments.moduleTable.scss';
import sprite from '@/assets/icons/sprite-admin.svg';

const SchoolDocumentsTable = ({ data }) => {
  const dataValues = Object.keys(data);

  return (
    <div className={styles.contentWrap}>
      <ul className={styles.tableHeader}>
        <li className={styles.cellHeadingHeader}>Назва документу</li>
        <li className={styles.cellActionHeader}>Дія</li>
      </ul>
      <div className={styles.tbody}>
        {dataValues.map((item, index) => (
          <div className={styles.tableRow} key={index}>
            <div className={styles.cellHeadingRow}>{dataKeys[index]}</div>
            <div className={styles.cellActionRow}>
              <Link
                to={`edit/${item}`}
                state={{ title: dataKeys[index], key: item, value: data[item] }}
              >
                <div className={styles.cellActionContainer}>
                  <svg className={styles.iconEdit}>
                    <use href={`${sprite}#icon-edit`} width="20" height="20" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SchoolDocumentsTable;
