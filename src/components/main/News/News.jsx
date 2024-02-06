import { useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { formatDate } from '@/utils/formatDate';
import useNewsStore from '@/store/newsStore';
import Container from '@/components/Container/Container';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
// import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import Navigation from './Navigation/Navigation';
import styles from './News.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import usePostersStore from '@/store/posterStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import useVideoStore from '@/store/videoStore';

const News = () => {
  const swiperRef = useRef();
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const { getNews } = useNewsStore();
  const news = useNewsStore(state => state.news);
  const loading = usePostersStore(state => state.loading);
  const { getAllVideo } = useVideoStore();
  const videos = useVideoStore(state => state.videos);

  const replaceUrl = url => {
    if (url && url.length) {
      return url?.replace('watch?v=', 'embed/');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getNews();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getNews]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        await getAllVideo();
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [getAllVideo]);

  console.log(videos);

  return (
    <section className={`${styles.News} section`}>
      <Container>
        <h2 className={styles.title}>Події</h2>
        {/* {isLaptop && (
          <div className={styles.ButtonContainer}>
            <NavLinkButton text={'Переглянути всі новини'} href={'/events'} />
          </div>
        )} */}
        {!loading ? (
          <div className={styles.wrapper}>
            {news?.length > 0 ? (
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
                {videos &&
                  Array.isArray(videos) &&
                  videos.length > 0 &&
                  videos.map((slide, index) => (
                    <SwiperSlide key={index} className={styles.Slide}>
                      {loading && (
                        <div className={styles.errorData}>Завантаження...</div>
                      )}
                      {!loading && (
                        // <div
                        //   className={styles.image}
                        //   style={{
                        //     background: `url(${slide.photo})`,
                        //     backgroundSize: 'cover',
                        //     backgroundPosition: 'center',
                        //     backgroundRepeat: 'no-repeat',
                        //   }}
                        // ></div>
                        <div className={styles.video}>
                          <iframe
                            src={replaceUrl(slide.media)}
                            title="Відео з життя школи"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen
                          ></iframe>
                        </div>
                      )}
                      {/* <div className={styles.Text}>
                        <span>{formatDate(slide.created_at)}</span>
                        <p>{slide.title}</p>
                      </div> */}
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
              <div className="errorData">
                <Placeholder />
              </div>
            )}
          </div>
        ) : (
          <Spinner />
        )}

        {/* {!isLaptop && (
          <div className={styles.ButtonContainer}>
            <NavLinkButton text={'Переглянути всі новини'} href={'/events'} />
          </div>
        )} */}
      </Container>
    </section>
  );
};

export default News;
