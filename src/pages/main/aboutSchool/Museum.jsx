import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import styles from './AboutSchool.module.scss';
import { useMediaQuery } from 'react-responsive';

const Museum = ({ museumData }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const museumRef = useRef();
  return isMobile ? (
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
    <ul>
      {museumData.map(item => (
        <li key={item.id}>
          <div>
            <img src={item.media} alt={item.description} width="300" />
          </div>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
};

export default Museum;
