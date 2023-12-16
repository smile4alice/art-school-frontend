import styles from './Articles.module.scss';

const Articles = ({ articles }) => {
  return (
    <>
      {articles &&
        Array.isArray(articles) &&
        articles.map((article, index) => (
          <article key={index} className={styles.Article}>
            <div className={styles.text}>
              <p>{article.text}</p>
            </div>
            <div className={styles.image}>
              <img src={article.image} alt="" />
            </div>
          </article>
        ))}
    </>
  );
};

export default Articles;
