import { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import { useMediaQuery } from 'react-responsive';
import useVideoStore from '@/store/videoStore';
import VideoButtons from '@/components/main/News/VideoButtons/VideoButtons';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import styles from './GalleryVideo.module.scss';
import 'swiper/css/pagination';
import 'swiper/css';


const GalleryVideo = () => {
  const swiperRef = useRef(null);
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const { getAllVideo } = useVideoStore();
  const videos = useVideoStore(state => state.videos);
  const videoIds = videos.map(video => {
    //отримуємо id відео з посилання на YouTube
    const id = video.media.split('v=')[1];
    return id;
  });
  const direction = isLaptop ? 'vertical' : 'horizontal';
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

  return (
    <>
      <div className={styles.videoWrapper}>
        {isLaptop && (
          <div className={styles.video}>
            {videoIds.length > 0 && Array.isArray(videoIds) && (
              <LiteYouTubeEmbed id={videoIds[0]} title="Відео з життя школи" />
              
            )}
          </div>
        )}

        {videos.length > 0 && (
          <div className={styles.videos}>
            <Swiper
              className={styles.swiper}
              onSwiper={swiper => (swiperRef.current = swiper)}
              direction={direction}
              slidesPerView={1}
              spaceBetween={20}
              mousewheel={true}
              modules={[Mousewheel]}
              breakpoints={{
                1280: {
                  slidesPerView: 2,
                },
              }}
            >
              {videos &&
                Array.isArray(videos) &&
                videoIds.slice(1).map((video, index) => (
                  <SwiperSlide className={styles.slide} key={index}>
                    <LiteYouTubeEmbed id={video} title="Відео з життя школи" />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
        <div className={styles.videoButtons}>
          <VideoButtons
            onPrevClick={() => swiperRef.current.slidePrev()}
            onNextClick={() => swiperRef.current.slideNext()}
          />
        </div>
      </div>
    </>
  );
};

export default GalleryVideo;
