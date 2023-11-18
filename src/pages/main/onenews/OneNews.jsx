import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';

import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import Data from '@/constants/allNews.json';

import 'swiper/scss';
import 'swiper/scss/navigation';

import styles from './OneNews.module.scss';

const OneNews = () => {
  const buttonName = 'переглянути всі новини';
  const url = '/news';
  const { id } = useParams();
  console.log ('id ', id);
  const oneNewsData = Data.find(e => e.id == id);
  console.log (oneNewsData);


  return (
    <Container>
      <section className="wrapper">
        <div className={styles.buttonContainer}>
          <NavLinkButton title={buttonName} link={url} />
        </div>
        <p className={`${styles.title} sectionTitle`}>{oneNewsData.title}</p>
        {/* <Swiper
          spaceBetween={2}
          slidesPerView={1}
          //onSlideChange={() => console.log('slide change')}
          //onSwiper={swiper => console.log(swiper)}
          navigation={true}
          modules={[Navigation]}
          className={styles.swiper}
        >
          {oneNewsData.image.map((img, index) => {
            <SwiperSlide className={`${styles.slide} swiper-lazy`} key={index}>
              <img src={img} alt="slide" />
            </SwiperSlide>;
          })}
        </Swiper> */}

        <div>
          {oneNewsData.image.map((img, index) => {
            console.log(img);
              <div key={index}>
                <img src={img} alt="slide" />
             </div> 
          })}
        </div>
        {console.log(oneNewsData.image)}
        {/* <img src={oneNewsData.image[0]} alt="slide" /> */}


        <p className={styles.text}>
          {oneNewsData.text}
        </p>
      </section>
    </Container>
  );
};

export default OneNews;
