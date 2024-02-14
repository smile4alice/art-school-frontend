import { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '@/components/ui/Spinner/Spinner';
import useVideoStore from '@/store/videoStore';
import Container from '@/components/Container/Container';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import styles from './News.module.scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
const VideoButtons = lazy(() => import('./VideoButtons/VideoButtons'));
const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);
const Select = lazy(() => import('@/components/ui/Select/Select'));

const News = ({ selectOptions, subDepartmentId }) => {
  const swiperRef = useRef();
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const { getMainVideo, getDepartmentVideo } = useVideoStore();
  const videos = useVideoStore(state => state.videos);
  const [loadingState, setLoadingState] = useState('loading');
  const [departmentId, setDepartmentId] = useState(subDepartmentId);

  const videoIds = videos.map(video => {
    //отримуємо id відео з посилання на YouTube
    const id = video.media.split('v=')[1];
    return id;
  });
  const changeDepartment = id => {
    setDepartmentId(id);
  };
  useEffect(() => {
    setDepartmentId(subDepartmentId);
  }, [subDepartmentId]);

  const fetchData = async () => {
    try {
      setLoadingState('loading');
      if (departmentId) {
        await getDepartmentVideo(departmentId);
      } else {
        await getMainVideo();
      }
      setLoadingState('success');
    } catch (error) {
      console.log(error);
      setLoadingState('error');
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [departmentId]);
  return (
    <section className={`${styles.News} section`}>
      {departmentId && (
        <h2 className={styles.titleDepartment}>Події відділу</h2>
      )}
      {departmentId && isLaptop && (
        <Suspense>
          <Select
            title="Обрати відділ"
            options={selectOptions}
            changeDepartment={changeDepartment}
          />
        </Suspense>
      )}
      <Container>
        {!departmentId && <h2 className={styles.title}>Події</h2>}
        <div className={styles.wrapper}>
          {loadingState === 'loading' && <Spinner />}
          {loadingState === 'success' && (
            <div className={styles.swiperContainer}>
              {isLaptop && videos?.length > 1 && (
                <Suspense>
                  <SwiperButtons
                    onPrevClick={() => swiperRef.current.slidePrev()}
                    onNextClick={() => swiperRef.current.slideNext()}
                  />
                </Suspense>
              )}
              <Swiper
                className={`${styles.Slider} ${
                  videos?.length > 1 ? styles.pagination : ''
                }`}
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ clickable: true }}
                // loop={true}
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                }}
              >
                {videos &&
                  Array.isArray(videos) &&
                  videos.length > 0 &&
                  videoIds.map((slide, index) => (
                    <SwiperSlide
                      key={index}
                      className={`swiper-lazy ${styles.Slide}`}
                    >
                      <div className={` ${styles.video}`}>
                        <LiteYouTubeEmbed
                          id={slide}
                          title="Відео з життя школи"
                        />
                      </div>
                      <div className="swiper-lazy-preloader"></div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
          {loadingState === 'error' && (
            <div className="errorData">
              <Placeholder />
            </div>
          )}

          {!isLaptop && videos?.length > 1 && (
            <Suspense>
              <VideoButtons
                onPrevClick={() => swiperRef.current.slidePrev()}
                onNextClick={() => swiperRef.current.slideNext()}
              />
            </Suspense>
          )}

          {departmentId && !isLaptop && (
            <div className={styles.select}>
              <Suspense>
                <Select
                  title="Обрати відділ"
                  options={selectOptions}
                  changeDepartment={changeDepartment}
                />
              </Suspense>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default News;
