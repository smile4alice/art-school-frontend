import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

import Arrow from '@/components/Icons/Arrow/Arrow';

import styles from './GalleryVideo.module.scss';
import 'swiper/css/pagination';
import 'swiper/css';

const GalleryVideo = ({ videos }) => {
  const swiperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const replaceUrl = url => {
    return url.replace('watch?v=', 'embed/');
  };
  return (
    <>
      {isLaptop && (
        <div className={styles.videoWrapper}>
          <div className={styles.video}>
            <iframe src={replaceUrl(videos[0])} allowFullScreen></iframe>
          </div>

          <div className={styles.videos}>
            <button
              onClick={() => swiperRef.current.slidePrev()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowUp}
            >
              <Arrow isHovered={isHovered} direction="up" />
            </button>
            <button
              onClick={() => swiperRef.current.slideNext()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowDown}
            >
              <Arrow isHovered={isHovered} direction="down" />
            </button>
            <Swiper
              direction={'vertical'}
              slidesPerView={2}
              spaceBetween={15}
              mousewheel={true}
              modules={[Mousewheel]}
              onSwiper={swiper => (swiperRef.current = swiper)}
              className={styles.swiper}
            >
              {videos.slice(1).map((video, index) => (
                <SwiperSlide className={styles.slide} key={index}>
                  <iframe
                    src={replaceUrl(video)}
                    width="382"
                    height="190"
                    allowFullScreen
                  ></iframe>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {isTablet && !isLaptop && (
        <div className={styles.videoWrapper}>
          <div className={styles.videos}>
            <button
              onClick={() => swiperRef.current.slidePrev()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowUp}
            >
              <Arrow isHovered={isHovered} />
            </button>
            <button
              onClick={() => swiperRef.current.slideNext()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowDown}
            >
              <Arrow isHovered={isHovered} />
            </button>
            <Swiper
              direction={'vertical'}
              slidesPerView={1}
              spaceBetween={25}
              mousewheel={true}
              modules={[Mousewheel]}
              onSwiper={swiper => (swiperRef.current = swiper)}
              className={styles.swiper}
            >
              {videos.map((video, index) => (
                <SwiperSlide className={styles.slide} key={index}>
                  <iframe src={replaceUrl(video)} allowFullScreen></iframe>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}

      {isMobile && (
        <div className={styles.videoWrapper}>
          <div className={styles.videos}>
            <button
              onClick={() => swiperRef.current.slidePrev()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowUp}
            >
              <Arrow isHovered={isHovered} />
            </button>
            <button
              onClick={() => swiperRef.current.slideNext()}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={styles.arrowDown}
            >
              <Arrow isHovered={isHovered} />
            </button>
            <Swiper
              direction={'horizontal'}
              slidesPerView={1}
              spaceBetween={25}
              mousewheel={true}
              modules={[Mousewheel]}
              onSwiper={swiper => (swiperRef.current = swiper)}
              className={styles.swiper}
            >
              {videos.map((video, index) => (
                <SwiperSlide className={styles.slide} key={index}>
                  <iframe src={replaceUrl(video)} allowFullScreen></iframe>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryVideo;
