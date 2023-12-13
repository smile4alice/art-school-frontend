import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';

import { images, videos } from '@/data/gallery.json';

import Container from '@/components/Container/Container';
import ArrowUp from '@/components/Icons/ArrowUp';
import ArrowDown from '@/components/Icons/ArrowDown';
import SortIcon from '@/components/Icons/SortIcon';

import styles from './Gallery.module.scss';
import 'swiper/css/pagination';
import 'swiper/css';

const Gallery = () => {
  const swiperRef = useRef(null);
  const [upHovered, setUpHovered] = useState(false);
  const [downHovered, setDownHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(14);
  const [sorting, setSorting] = useState(false);
  const [sortedImages, setSortedImages] = useState(images);
  const isMaxAmount = itemsPerPage >= images.length - 1;

  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const replaceUrl = url => {
    return url.replace('watch?v=', 'embed/');
  };

  const viewMore = () => {
    if (!isMaxAmount) {
      setItemsPerPage(prev => prev + 14);
    }
  };
  const viewLess = () => {
    if (itemsPerPage > 14) {
      setItemsPerPage(prev => prev - 14);
    }
  };

  useEffect(() => {
    if (sorting) {
      setSortedImages(images.sort((a, b) => b.date - a.date));
    } else {
      setSortedImages(images.sort((a, b) => a.date - b.date));
    }
  }, [setSortedImages, sorting]);

  return (
    <Container>
      <section className={styles.Gallery}>
        <div className={styles.galleryHeading}>
          <h1>Галерея</h1>
        </div>
        <div className={styles.youtubeLink}>
          <p>
            Дивитися більше відео {isMobile && <br />} на нашому
            <a
              href="https://www.youtube.com/@ArtSchoolVerykivskogo"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/icons/youtube-icon.svg" alt="youtube" />
            </a>
          </p>
        </div>
        {isLaptop && (
          <div className={styles.videoWrapper}>
            <div className={styles.video}>
              <iframe src={replaceUrl(videos[0])} allowFullScreen></iframe>
            </div>

            <div className={styles.videos}>
              <button
                onClick={() => swiperRef.current.slidePrev()}
                onMouseEnter={() => setUpHovered(true)}
                onMouseLeave={() => setUpHovered(false)}
                className={styles.arrowUp}
              >
                <ArrowUp hovered={upHovered} />
              </button>
              <button
                onClick={() => swiperRef.current.slideNext()}
                onMouseEnter={() => setDownHovered(true)}
                onMouseLeave={() => setDownHovered(false)}
                className={styles.arrowDown}
              >
                <ArrowDown hovered={downHovered} />
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
                onMouseEnter={() => setUpHovered(true)}
                onMouseLeave={() => setUpHovered(false)}
                className={styles.arrowUp}
              >
                <ArrowUp hovered={upHovered} />
              </button>
              <button
                onClick={() => swiperRef.current.slideNext()}
                onMouseEnter={() => setDownHovered(true)}
                onMouseLeave={() => setDownHovered(false)}
                className={styles.arrowDown}
              >
                <ArrowDown hovered={downHovered} />
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
                onMouseEnter={() => setUpHovered(true)}
                onMouseLeave={() => setUpHovered(false)}
                className={styles.arrowUp}
              >
                <ArrowUp hovered={upHovered} />
              </button>
              <button
                onClick={() => swiperRef.current.slideNext()}
                onMouseEnter={() => setDownHovered(true)}
                onMouseLeave={() => setDownHovered(false)}
                className={styles.arrowDown}
              >
                <ArrowDown hovered={downHovered} />
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

        <div className={styles.sort}>
          <button onClick={() => setSorting(!sorting)}>
            <SortIcon />
            {!sorting
              ? ' Сортування від новіших до старіших'
              : ' Сортування від старіших до новіших'}
          </button>
        </div>
        <div className={styles.gallery}>
          {sortedImages.slice(0, itemsPerPage).map((image, index) => (
            <div key={image.date} className={styles.item}>
              <img src={image.url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
        {!isMaxAmount ? (
          <button
            className={styles.viewMore}
            onMouseEnter={() => setDownHovered(true)}
            onMouseLeave={() => setDownHovered(false)}
            onClick={viewMore}
          >
            Дивитися Більше <ArrowDown hovered={downHovered} />
          </button>
        ) : (
          <button
            className={styles.viewMore}
            onMouseEnter={() => setUpHovered(true)}
            onMouseLeave={() => setUpHovered(false)}
            onClick={viewLess}
          >
            Дивитися Менше <ArrowUp hovered={upHovered} />
          </button>
        )}
      </section>
    </Container>
  );
};

export default Gallery;
