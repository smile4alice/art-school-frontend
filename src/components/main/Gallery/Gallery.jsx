import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/DownloadButton';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { images } from '@/constants/gallery';
import styles from './Gallery.module.scss';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const swiperRef = useRef();
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 678 });

  const slidesLength = isMobile ? 1 : 2;
  return (
    <Container>
      <section className={styles.Gallery}>
        <div className={styles.galleryHeading}>
          <h1>Галерея</h1>
        </div>
        {isLaptop && (
          <div className={styles.ButtonContainer}>
            <Link to={'/gallery'}>
              <NavLinkButton title={'Дивитися більше'} />
            </Link>
          </div>
        )}
        {isLaptop && (
          <div className={styles.gallery}>
            {images.slice(0, 7).map((image, index) => (
              <div key={image.date} className={styles.item}>
                <img src={image.url} alt={`Image ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
        {isTablet && (
          <>
            <Swiper
              className={styles.Slider}
              spaceBetween={10}
              slidesPerView={slidesLength}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
            >
              {images.slice(0, 5).map((slide, index) => (
                <SwiperSlide key={index} className={styles.Slide}>
                  <img src={slide.url} alt={slide.title} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={styles.ButtonContainer}>
              {/* <NavLinkButton title={'Дивитися більше'} href={'/gallery'} /> */}
              <Link to="/gallery" className={styles.NavLinkButton}>
                more
              </Link>
            </div>
          </>
        )}
      </section>
    </Container>
  );
};

export default Gallery;
