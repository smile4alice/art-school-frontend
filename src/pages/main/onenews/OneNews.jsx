import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';

import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './OneNews.module.scss';

const OneNews = ({ newsTitle, newsImgArr, newsText }) => {
  const buttonName = 'переглянути всі новини';
  const url = '/allnews';
  return (
    <Container>
      <section className="wrapper">
        <div className={styles.buttonContainer}>
          <NavLinkButton title={buttonName} link={url} />
        </div>
        <p className={`${styles.title} sectionTitle`}>{newsTitle}</p>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => console.log(swiper)}
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {newsImgArr.map((img, index) => {
            <SwiperSlide className={`${styles.slide} swiper-lazy`} key={index}>
              <img src={img} alt="slide" />
            </SwiperSlide>;
          })}
        </Swiper>
        <p className={styles.text}>
          {newsText}
        </p>
      </section>
    </Container>
  );
};

export default OneNews;
