//import { Swiper, SwiperSlide } from 'swiper/react';
//import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';

import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import Data from '@/constants/allNews.json';

//import 'swiper/scss';
//import 'swiper/scss/navigation';

import styles from './OneNews.module.scss';

const OneNews = () => {
  const buttonName = 'переглянути всі новини';
  const url = '/news';
  const { id } = useParams();
  const oneNewsData = Data.find(e => e.id == id);

  return (
    <Container>
      <section className={styles.wrapper}>
        <div className={styles.buttonContainer}>
          <NavLinkButton link={url}  text={buttonName}  />
        </div>
        <p className={`${styles.title} sectionTitle`}>{oneNewsData.title}</p>
        <p className={styles.date}>{oneNewsData.date}</p>

        {/* <Swiper
          spaceBetween={2}
          slidesPerView={1}
          //onSlideChange={() => console.log('slide change')}
          //onSwiper={swiper => console.log(swiper)}
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {oneNewsData.image.map((img, index) => (
            <SwiperSlide className={`${styles.slide} swiper-lazy`} key={index}>
              <img src={img} alt="slide" />
            </SwiperSlide>
          ))}
        </Swiper> */}
        <div className={styles.img}>
          <img src={oneNewsData.image[0]} alt="slide" />
        </div>
        <p className={styles.text}>{oneNewsData.text}</p>
      </section>
    </Container>
  );
};

export default OneNews;
