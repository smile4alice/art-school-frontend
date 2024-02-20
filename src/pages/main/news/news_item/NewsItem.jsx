import styles from './NewsItem.module.scss';
import { formatDate } from '@/utils/formatDate';

const NewsItem = ({ imgSrc, date, title, id }) => {
  return (
    <div key={id} className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={imgSrc} alt={title ? title : 'КДШМ №2 ім. М.І.Вериківського захід '} />
      </div>
      <div className={styles.text}>
        <p className={styles.date}>{formatDate(date)}</p>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
};

export default NewsItem;
