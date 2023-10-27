import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import Container from '@/components/Container/Container';
import fakeDataAchievements from './achievements-fake-data.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import s from './Achievements.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const fetchFakeData = () => {
  return fakeDataAchievements;
};

const Achievements = () => {
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const data = fetchFakeData();
  const swiperRef = useRef();

  return (
    <Container>
      <section className={s.achievements}>
        <h2>Наші досягнення</h2>

        <div className={s.slidersContainer}>
          {isLaptop && (
            <>
              <button
                className={s.prevSlide}
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
                className={s.nextSlide}
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
            className={s.slider}
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            pagination={{ clickable: true }}
            loop={true}
          >
            {data.map(item => (
              <SwiperSlide className={s.sliderContent} key={item.id}>
                <div className={s.slidePhoto}>
                  <img src={item.url} alt="Фото" />
                </div>
                <p className={s.slideText}>{item.text}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </Container>
  );
};

export default Achievements;
