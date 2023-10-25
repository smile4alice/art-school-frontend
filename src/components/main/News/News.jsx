import { Pagination } from 'swiper/modules';
import { news } from '@/constants/news.js';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import styles from './News.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

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
              <img src={slide.img} alt={slide.title} />
              <div className={styles.Text}>
                <span>{slide.date}</span>
                <p>{slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Container>
  );
};

export default News;
