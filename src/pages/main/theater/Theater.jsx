import { Pagination } from 'swiper/modules';

import { SwiperSlide, Swiper } from 'swiper/react';

import { useMediaQuery } from 'react-responsive';
import { useRef } from 'react';
import {
  theaterDepartmentInfo,
  theaterDepartmentAchivments,
  theaterDepartmentImages,
} from '@/constants/theaterDepartmentInfo';

import Container from '@/components/Container/Container';
import AchievementsSlider from '@/components/Slider/achievementsSlider/achievementsSlider';

import styles from './Theater.module.scss';

const Theater = () => {
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const theaterDepartmentSwiperRef = useRef();
  return (
    <section className={styles.theater}>
      <Container>
        <div className={styles.theater_contentWrapper}>
          <h2 className="department_title ">Театральне відділення</h2>
          <ul className={styles.theater_list}>
            {theaterDepartmentInfo.map(item => (
              <li className={styles.theater_list_listItem} key={item.id}>
                <div className={styles.theater_list_listItem_content}>
                  <p className={styles.theater_list_listItem_content_text}>
                    {item.description}
                  </p>
                  <img
                    className={styles.theater_list_listItem_content_img}
                    src={item.url}
                    alt=""
                  />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.departmentImage}>
            <div className={styles.departmentImage_contentWrapper}>
              <div className={styles.slidersContainer}>
                {isLaptop && (
                  <>
                    <button
                      className={styles.prevSlide}
                      onClick={() =>
                        theaterDepartmentSwiperRef.current.slidePrev()
                      }
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
                      onClick={() =>
                        theaterDepartmentSwiperRef.current.slideNext()
                      }
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
                    theaterDepartmentSwiperRef.current = swiper;
                  }}
                  className={styles.slider}
                  modules={[Pagination]}
                  spaceBetween={48}
                  slidesPerView={1}
                  breakpoints={{
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 24,
                    },
                    1280: {
                      slidesPerView: 3,
                    },
                  }}
                  pagination={{ clickable: true }}
                  loop={true}
                >
                  {theaterDepartmentImages.map(item => (
                    <SwiperSlide className={styles.slideContent} key={item.id}>
                      <div className={styles.slidePhoto}>
                        <img src={item.url} alt="Фото" />
                      </div>
                      <p className={styles.slideText}>{item.text}</p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className={styles.departmentAchivments}>
            <div className={styles.departmentAchivments_contentWrapper}>
              <h2 className="department_title ">Досягнення відділу</h2>
              <AchievementsSlider data={theaterDepartmentAchivments} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Theater;
