import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDate } from '@/utils/formatDate';
import useNewsStore from '@/store/newsStore';
import Container from '@/components/Container/Container';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import NavLinkButton from '@/components/ui/Buttons/DownloadButton';
import Navigation from './Navigation/Navigation';
import styles from './News.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Link } from 'react-router-dom';

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
        setNews(result.items);
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
          <Link to="/news" className={styles.ButtonContainer}>
            <NavLinkButton title={'Переглянути всі новини'} href={'/news'} />
          </Link>
        )}
        <div className={styles.wrapper}>
          {loadingState === 'success' ? (
            <Swiper
              className={styles.Slider}
              spaceBetween={50}
              slidesPerView={1}
              modules={[Pagination]}
              pagination={{ clickable: true }}
              loop={true}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
            >
              {news &&
                Array.isArray(news) &&
                news.map((slide, index) => (
                  <SwiperSlide key={index} className={styles.Slide}>
                    <div className={styles.image}>
                      {loadingState === 'loading' && (
                        <div className={styles.errorData}>Завантаження...</div>
                      )}
                      {loadingState === 'success' && (
                        <img src={slide.photo} alt={slide.title} />
                      )}
                    </div>
                    <div className={styles.Text}>
                      <span>{formatDate(slide.created_at)}</span>
                      <p>{slide.title}</p>
                    </div>
                  </SwiperSlide>
                ))}
              {isLaptop && (
                <Navigation
                  onPrevClick={() => swiperRef.current.slidePrev()}
                  onNextClick={() => swiperRef.current.slideNext()}
                />
              )}
            </Swiper>
          ) : (
            <div className={styles.errorData}>
              <Placeholder />
            </div>
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
