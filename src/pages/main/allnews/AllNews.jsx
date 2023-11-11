import { useRef, useState, useEffect } from 'react';

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

  const showOneNews = (e) => {
    console.log('event', e.target);
  };

  return (
    <Container>
      <section className={styles.wrapper}>
        <div className={styles.newsWrapper} onClick={showOneNews}>
            {Data.slice(0, itemsPerPage).map((item, index) => (
                <OneItem imgSrc={item.image} date={item.date} title={item.name} key={index} />
            ))}
        </div>

        {!isMaxAmount ? (
          <button
            className={styles.viewMore}
            onMouseEnter={() => setDownHovered(true)}
            onMouseLeave={() => setDownHovered(false)}
            onClick={viewMore}
          >
            Дивитися Більше <ArrowDown hovered={downHovered} />
          </button>
        ) : (
          <button
            className={styles.viewMore}
            onMouseEnter={() => setUpHovered(true)}
            onMouseLeave={() => setUpHovered(false)}
            onClick={viewLess}
          >
            Дивитися Менше <ArrowUp hovered={upHovered} />
          </button>
        )}
      </section>
    </Container>
  );
};

export default AllNews;
