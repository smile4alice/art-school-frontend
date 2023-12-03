import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import styles from './AboutSchool.module.scss';
import { useMediaQuery } from 'react-responsive';

const Museum = ({ museumData }) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const museumRef = useRef();
  return !isDesktop ? (
    <div className={styles.slidersContainer}>
      <Swiper
        onSwiper={swiper => {
          museumRef.current = swiper;
        }}
        className={styles.slider}
        modules={[Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
      >
        {museumData.map(item => (
          <SwiperSlide className={styles.slideContent} key={item.id}>
            <div className={styles.slidePhoto}>
              <p className={styles.slideText}>{item.description}</p>
              <img src={item.media} alt={item.description} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ) : (
    <ul className={styles.museumList}>
      {museumData.map(item => (
        <li key={item.id} className={styles.museumList_item}>
          <div className={styles.museum_content}>
            <p className={styles.museum_content_text}>{item.description}</p>
            <img
              src={item.media}
              alt={item.description}
              className={styles.museum_content_img}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Museum;
