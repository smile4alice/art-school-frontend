import styles from './oneItem.module.scss';

const OneItem = ({ imgSrc, date, title, id }) => {
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

export default OneItem;
