import { Markup } from 'interweave';
import styles from './Articles.module.scss';

const Articles = ({ articles, title }) => {
  return (
    <section className="section">
      <div className={styles.articleWrapper}>
        {articles &&
          Array.isArray(articles) &&
          articles.map((article, index) => (
            <article key={index} className={styles.article}>
              <div className={styles.textWrapper}>
                <Markup className={styles.text} content={article.text} />
              </div>
              <div className={styles.image}>
                <img src={article.image} alt={title} />
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default Articles;
