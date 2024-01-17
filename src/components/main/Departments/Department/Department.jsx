import { Link } from 'react-router-dom';
import styles from './Department.module.scss';

const Department = ({ title, link, img }) => {
  const knowMore = 'Дізнатись більше';

  return (
    <Link to={link}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className={styles.cardTitle}>{title}</p>
          <div className={styles.knowMore}>{knowMore}</div>
        </div>
        <div className={styles.picture}>
          <img src={img} alt={title} />
        </div>
      </div>
    </Link>
  );
};

export default Department;
