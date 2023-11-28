import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import OneItem from './oneItem/oneItem';
import Container from '@/components/Container/Container';
import ArrowUp from '@/components/Icons/ArrowUp';
import ArrowDown from '@/components/Icons/ArrowDown';
import Data from '@/constants/allNews.json';

import styles from './AllNews.module.scss';

const AllNews = () => {
  const [upHovered, setUpHovered] = useState(false);
  const [downHovered, setDownHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const isMaxAmount = itemsPerPage >= Data.length - 1;

  const viewMore = () => {
    if (!isMaxAmount) {
      setItemsPerPage(prev => prev + 8);
    }
  };
  const viewLess = () => {
    if (itemsPerPage > 8) {
      setItemsPerPage(prev => prev - 8);
    }
  };

     useEffect(() => {
       window.scrollTo(0, 0);
     }, []);
  return (
    <Container>
      <section className={styles.wrapper}>
        <p className={`${styles.title} sectionTitle`}>Новини</p>
        <div className={styles.newsWrapper}>
          {Data.slice(0, itemsPerPage).map((item, index) => (
            <Link to={item.id} key={index}>
              <OneItem
                imgSrc={item.image[1]}
                date={item.date}
                title={item.title}
              />
            </Link>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          {!isMaxAmount ? (
            <button
              className={styles.viewMore}
              onMouseEnter={() => setDownHovered(true)}
              onMouseLeave={() => setDownHovered(false)}
              onClick={viewMore}
            >
              Дивитися більше <ArrowDown hovered={downHovered} />
            </button>
          ) : (
            <button
              className={styles.viewMore}
              onMouseEnter={() => setUpHovered(true)}
              onMouseLeave={() => setUpHovered(false)}
              onClick={viewLess}
            >
              Дивитися менше <ArrowUp hovered={upHovered} />
            </button>
          )}
        </div>
      </section>
    </Container>
  );
};

export default AllNews;
