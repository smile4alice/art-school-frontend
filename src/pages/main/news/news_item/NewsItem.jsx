import { useEffect } from 'react';
import styles from './NewsItem.module.scss';

const NewsItem = ({ imgSrc, date, title, id }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div key={id} className={styles.wrapper}>
      <div className={styles.imgContainer}>
        <img src={imgSrc} alt="pictire" />
      </div>
      <p className={styles.date}>{date}</p>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default NewsItem;