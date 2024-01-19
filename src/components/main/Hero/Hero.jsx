import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect } from 'react';
import useSlidersStore from '@/store/slidersStore';
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  const swiperRef = useRef();
  const { getSlides } = useSlidersStore();
  const slides = useSlidersStore(state => state.slides);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSlides();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getSlides]);

  return (
    <section className={styles.HeroSection}>
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
      <Swiper
        style={{
          '--swiper-navigation-color': '#d66600',
          '--swiper-navigation-sides-offset': '2.8rem',
          '--swiper-navigation-size': '1.25rem',
          '--swiper-pagination-bullet-horizontal-gap': '0.3rem',
          '--swiper-pagination-bottom': '1rem',
          '--swiper-pagination-bullet-active': '3rem',
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        keyboard={true}
        slidesPerView={1}
        spaceBetween={2}
        loop={true}
        speed={1500}
        modules={[Autoplay, Pagination, Keyboard]}
        className={styles.SliderStyle}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={styles.SlideStyle}>
            <div className={styles.slideImage}>
              <img
                src={slide.photo}
                alt={slide.title}
                className={styles.HeroImage}
              />
            </div>
            {index === 0 && (
              <div className={styles.HeroTitle}>
                <p  className={styles.HeroPrimaryTitle}>
                  Київська дитяча школа мистецтв №2
                </p>
                <span className={styles.HeroSecondaryTitle}>
                  ім. M. I. Вериківського
                </span>
              </div>
            )}
            {index >= 0 && (slide.title || slide.description) && (
              <div className={styles.HeroEvent}>
                <h3 className={`${styles.HeroEventTitle} ${slide.title && slide.description ? styles.margin : ''}`}>{slide.title}</h3>
                <p className={styles.HeroEventInfo}>{slide.description}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
