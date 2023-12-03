import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from '@/utils/formatDate';
import useNewsStore from '@/store/newsStore';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/DownloadButton';
import styles from './News.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const News = () => {
  const swiperRef = useRef();
  const isLaptop = useMediaQuery({ minWidth: 1024 });
  const { getNews } = useNewsStore();
  const [news, setNews] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getNews();
        setNews(result);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getNews]);

  return (
    <Container>
      <section className={styles.News}>
        <h1>Новини</h1>

        {isLaptop && (
          <div className={styles.ButtonContainer}>
            <NavLinkButton title={'Переглянути всі новини'} href={'/'} />
          </div>
        )}
        <div className={styles.wrapper}>
          <Swiper
            className={styles.Slider}
            spaceBetween={50}
            slidesPerView={1}
            modules={[Pagination]}
            pagination={{ clickable: true }}
            // loop={true}
            onSwiper={swiper => {
              swiperRef.current = swiper;
            }}
          >
            {loadingState === 'success' &&
              news.items &&
              Array.isArray(news.items) &&
              news.items.map((slide, index) => (
                <SwiperSlide key={index} className={styles.Slide}>
                  <div className={styles.image}>
                    {loadingState === 'loading' ? (
                      <div className={styles.errorData}>Завантаження...</div>
                    ) : (
                      <img src={slide.photo} alt={slide.title} />
                    )}
                    {!news.items.length && (

                      <div className={styles.errorData}>
                        Дані тимчасово відсуті
                      </div>
                    )}
                  </div>
                  <div className={styles.Text}>
                    <span>{formatDate(slide.created_at)}</span>
                    <p>{slide.title}</p>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
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
        </div>
        {!isLaptop && (
          <div className={styles.ButtonContainer}>
            <NavLinkButton title={'Переглянути всі новини'} href={'/'} />
          </div>
        )}
      </section>
    </Container>
  );
};

export default News;
