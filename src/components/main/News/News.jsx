import { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Container from '@/components/Container/Container';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import Navigation from './Navigation/Navigation';
import styles from './News.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Spinner from '@/components/ui/Spinner/Spinner';
import useVideoStore from '@/store/videoStore';
import Select from '@/components/ui/Select/Select';

const News = ({ selectOptions }) => {
  const swiperRef = useRef();
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const { getMainVideo, getDepartmentVideo } = useVideoStore();
  const videos = useVideoStore(state => state.videos);
  const [loadingState, setLoadingState] = useState('loading');
  const [departmentId, setDepartmentId] = useState(selectOptions?.[0].id);
  const [page, setPage] = useState(1);
  const changeDepartment = id => {
    setDepartmentId(id);
  };

  const replaceUrl = url => {
    if (url && url.length) {
      return url?.replace('watch?v=', 'embed/');
    }
  };

  const fetchData = async () => {
    try {
      setLoadingState('loading');
      if (departmentId) {
        await getDepartmentVideo(departmentId, page);
      } else {
        await getMainVideo(page);
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
  }, [page, departmentId]);
  return (
    <section className={`${styles.News} section`}>
      {departmentId && isLaptop && (
        <Select
          title="Обрати відділ"
          options={selectOptions}
          changeDepartment={changeDepartment}
        />
      )}
      <Container>
        {!departmentId && <h2 className={styles.title}>Події</h2>}
        <div className={styles.wrapper}>
          {loadingState === 'loading' && <Spinner />}
          {loadingState === 'success' && (
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
                    <div className={styles.video}>
                      <iframe
                        src={replaceUrl(slide.media)}
                        title="Відео з життя школи"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
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
          )}
          {loadingState === 'error' && (
            <div className="errorData">
              <Placeholder />
            </div>
          )}

          {departmentId && !isLaptop && (
            <Select
              title="Обрати відділ"
              options={selectOptions}
              changeDepartment={changeDepartment}
            />
          )}
        </div>
      </Container>
    </section>
  );
};

export default News;
