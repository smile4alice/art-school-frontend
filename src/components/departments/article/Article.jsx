import styles from './Article.module.scss';

const Article = ({ article, index }) => {
  const reverted = index % 2 !== 0;

  return (
    <article className={!reverted ? styles.Article : styles.Article_reverted}>
      <div className={styles.text}>
        <p>{article.text}</p>
      </div>
      <div className={styles.image}>
        <img src={article.image} alt="" />
      </div>
    </article>
  );
};

export default Article;
