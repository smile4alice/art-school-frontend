import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import NewsItem from './news_item/NewsItem';
import Container from '@/components/Container/Container';
import ViewButton from '@/components/ui/Buttons/ViewButton/ViewButton';

import news from '@/data/news.json';

import styles from './AllNews.module.scss';

const AllNews = () => {
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const isMaxAmount = itemsPerPage >= news.length;

  const viewMore = () => {
    if (!isMaxAmount) {
      setItemsPerPage(prev => prev + 6);
    }
  };
  const viewLess = () => {
    setItemsPerPage(6);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <section className={styles.wrapper}>
        <p className={`${styles.title} sectionTitle`}>Новини</p>
        <div className={styles.newsWrapper}>
          {news &&
            Array.isArray(news) &&
            news.slice(0, itemsPerPage).map((item, index) => (
              <Link to={item.id} key={index}>
                <NewsItem
                  imgSrc={item.image[1]}
                  date={item.date}
                  title={item.title}
                />
              </Link>
            ))}
        </div>
        <div className={styles.buttonContainer}>
          <ViewButton
            isMaxAmount={isMaxAmount}
            viewMore={viewMore}
            viewLess={viewLess}
          />
        </div>
      </section>
    </Container>
  );
};

export default AllNews;
