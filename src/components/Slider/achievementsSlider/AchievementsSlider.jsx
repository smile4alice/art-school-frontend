import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './AchievementsSlider.module.scss';
const AchievementsSlider = ({ data }) => {
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const swiperRef = useRef();
  return (
    <div className={styles.slidersContainer}>
      {isLaptop && (
        <>
          <button
            className={styles.prevSlide}
            onClick={() => swiperRef.current.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
          <button
            className={styles.nextSlide}
            onClick={() => swiperRef.current.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 320 512"
            >
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
            </svg>
          </button>
        </>
      )}
      <Swiper
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        className={styles.slider}
        modules={[Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        pagination={{ clickable: true }}
        loop={true}
      >
        {data.map(item => (
          <SwiperSlide className={styles.slideContent} key={item.id}>
        
              <div className={styles.slidePhoto}>
                <img src={item.url} alt="Фото" />
              </div>
              <p className={styles.slideText}>{item.text}</p>
       
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AchievementsSlider;
