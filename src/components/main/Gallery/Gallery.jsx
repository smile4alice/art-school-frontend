import { useRef, useState, useEffect, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useServicesStore from '@/store/serviseStore';
import { useActiveImg } from '@/store/selectImg';
import Spinner from '@/components/ui/Spinner/Spinner';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import s from './Gallery.module.scss';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));

const Gallery = () => {
  const { getMainAchievementsPage } = useServicesStore();
  const swiperRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeImg, setActiveImg } = useActiveImg();
  const [totalPages, setTotalPages] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const [loadingState, setLoadingState] = useState('loading');
  const [data, setData] = useState([]);
  const firstFetchPageSize = isDesktop ? 3 : isLaptop ? 2 : 1;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;
  const [currentIndex, setCurrentIndex] = useState(1);

  const setActiveImgUrl = async id => {
    const selectImg = await data.find(item => item.id === id);
    setActiveImg(selectImg);
  };

  useEffect(() => {
    if (isDesktop) {
      const firstFetchData = async () => {
        try {
          setLoadingState('loading');
          const result = await getMainAchievementsPage('gallery', 1);
          setData(result.items);
          setLoadingState('success');
        } catch (error) {
          setLoadingState('error');
          console.log(error);
        }
      };
      firstFetchData();
    } else {
      const firstFetchData = async () => {
        try {
          setLoadingState('loading');
          const result = await getMainAchievementsPage(
            'gallery',
            1,
            firstFetchPageSize
          );
          setData(result.items);
          setCurrentPage(firstFetchPageSize + 1);
          setLoadingState('success');
        } catch (error) {
          setLoadingState('error');
          console.log(error);
          setData([]);
        }
      };
      firstFetchData();
    }
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    const fetchNextData = async () => {
      if (currentPage > firstFetchPageSize) {
        try {
          const result = await getMainAchievementsPage(
            'gallery',
            currentPage,
            pageSize
          );
          setData(prevData => [...prevData, ...result.items]);
          setTotalPages(result.pages);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchNextData();
    //eslint-disable-next-line
  }, [currentPage]);

  // swiper navigation
  const handlePrevSlide = () => {
    if (currentIndex > 1) {
      setCurrentIndex(prevValue => prevValue - 1);
    }
  };
  const handleNextSlide = () => {
    if (currentIndex < totalPages) {
      setCurrentIndex(prevValue => prevValue + 1);
    }
    if (currentPage < totalPages && currentPage >= currentIndex) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  return (
    <section className={`${s.gallerySection} section`}>
      <Container>
        <h2 className={s.title}>Галерея</h2>

        {isDesktop && (
          <div className={s.ButtonContainer}>
            <NavLinkButton text={'Дивитися більше'} href={'/gallery'} />
          </div>
        )}
        {loadingState === 'loading' && (
          <div className={s.errorData}>
            <Spinner />
          </div>
        )}
        {loadingState === 'error' && (
          <div className="errorData">
            <Placeholder />
          </div>
        )}
        {loadingState === 'success' &&
          data?.length > 0 &&
          (isDesktop ? (
            <div className={s.gallery}>
              {data.map((image, i) => (
                <div key={i} className={s.item}>
                  <img
                    src={image.media}
                    alt={
                      image.description
                        ? image.description
                        : 'КДШМ М.І.Вериківського фото'
                    }
                    onClick={() => {
                      setActiveImgUrl(image.id);
                      setIsModalOpen(!isModalOpen);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Swiper
              className={s.slider}
              onSwiper={swiper => {
                swiperRef.current = swiper;
              }}
              onSlidePrevTransitionStart={() => {
                handlePrevSlide();
              }}
              onSlideNextTransitionStart={() => {
                handleNextSlide();
              }}
              modules={[Pagination]}
              pagination={{
                type: 'bullets',
                dynamicBullets: true,
                dynamicMainBullets: 3,
              }}
              spaceBetween={16}
              slidesPerView={1}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
              }}
            >
              {data.map((slide, index) => (
                <SwiperSlide key={index} className={`swiper-lazy ${s.slide}`}>
                  <img
                    src={slide.media}
                    alt={
                      slide.description
                        ? slide.description
                        : 'КДШМ М.І.Вериківського фото'
                    }
                    loading="lazy"
                    onClick={() => {
                      setActiveImgUrl(slide.id);
                      setIsModalOpen(!isModalOpen);
                    }}
                  />
                  <div className="swiper-lazy-preloader"></div>
                </SwiperSlide>
              ))}
            </Swiper>
          ))}
        {!isDesktop && (
          <div className={s.ButtonContainer}>
            <NavLinkButton text={'Дивитись більше'} href={'/gallery'} />
          </div>
        )}
      </Container>
      {isModalOpen && activeImg.media && (
        <Suspense>
          <Modal
            isModalOpen={isModalOpen}
            closeModal={setIsModalOpen}
            accentIcon={true}
          >
            <img
              src={activeImg.media}
              alt={` ${
                activeImg.description
                  ? activeImg.description
                  : 'КДШМ М.І.Вериківського фото'
              }`}
            />
          </Modal>
        </Suspense>
      )}
    </section>
  );
};

export default Gallery;
