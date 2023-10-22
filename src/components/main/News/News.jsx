import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/NavLinkButton/NavLinkButton';
import { news } from '@/constants/news.js';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import styles from './News.module.scss';

const News = () => {
  return (
    <Container>
      <section className={styles.News}>
        <h1>Новини</h1>
        <div className={styles.ButtonContainer}>
          <NavLinkButton title={'Переглянути всі новини'} href={'/'} />
        </div>
        <Swiper
          className={styles.Slider}
          spaceBetween={10}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={true}
        >
          {news.map((slide, index) => (
            <SwiperSlide key={index} className={styles.Slide}>
              <img src="/images/news/ph.png" alt="" />
              <div className={styles.Text}>
                <span>5 Жовтня 2023</span>
                <p>Звітний концерт відділу сольного співу</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default News;
