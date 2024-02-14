import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import Container from '@/components/Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useActiveImg } from '@/store/selectImg';
import s from './Achievements.module.scss';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));
const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);
const Select = lazy(() => import('@/components/ui/Select/Select'));

const Achievements = ({
  title,
  url,
  showSelect,
  selectOptions,
  subDepartmentId,
}) => {
  const swiperRef = useRef();
  const { getMainAchievementsPage, getDepartmentAchievementsPage } =
    useServicesStore();
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [totalPages, setTotalPages] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const [departmentId, setDepartmentId] = useState(subDepartmentId);
  const [loadingState, setLoadingState] = useState('loading');
  const [data, setData] = useState([]);
  const firstFetchPageSize = isDesktop ? 3 : isLaptop ? 2 : 1;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 1;
  const [currentIndex, setCurrentIndex] = useState(1);

  const changeDepartment = id => {
    setData([]);
    setLoadingState('Loading');
    setDepartmentId(id);
    setCurrentPage(1);
    setCurrentIndex(1);
  };

  const setActiveImgUrl = async id => {
    const selectImg = await data.find(item => item.id === id);
    setActiveImg(selectImg);
  };

  useEffect(() => {
    setDepartmentId(subDepartmentId);
    setCurrentPage(1);
  }, [subDepartmentId]);

  useEffect(() => {
    const firstFetchData = async () => {
      try {
        setLoadingState('loading');
        let result;
        if (url === 'achievements') {
          result = await getMainAchievementsPage(
            url,
            currentPage,
            firstFetchPageSize
          );
        } else {
          if (departmentId) {
            result = await getDepartmentAchievementsPage(
              url,
              departmentId,
              1,
              firstFetchPageSize
            );
          }
        }
        if (result?.items) {
          setData(result.items);
        }
        setCurrentPage(firstFetchPageSize + 1);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
        console.log(error);
        setData([]);
      }
    };
    firstFetchData();
    //eslint-disable-next-line
  }, [departmentId]);

  useEffect(() => {
    const fetchNextData = async () => {
      if (currentPage > firstFetchPageSize && data.length > 0) {
        try {
          let result;
          if (url === 'achievements') {
            result = await getMainAchievementsPage(url, currentPage, pageSize);
          } else {
            if (departmentId) {
              result = await getDepartmentAchievementsPage(
                url,
                departmentId,
                currentPage,
                pageSize
              );
            }
          }
          if (result?.items) {
            setData(prevData => [...prevData, ...result.items]);
          }

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
    <section className={`${s.achievements}`}>
      <Container>
        <div className={s.achievementsWrapper}>
          <h2 className={subDepartmentId ? '' : s.title}>{title}</h2>
          {showSelect && isDesktop && (
            <Suspense>
              <Select
                title="Обрати відділ"
                options={selectOptions}
                changeDepartment={changeDepartment}
              />
            </Suspense>
          )}
          {loadingState === 'loading' && (
            <div className={s.errorData}>
              <Spinner />
            </div>
          )}
          {loadingState === 'error' && (
            <div className={`${s.errorData} errorData`}>
              <Placeholder />
            </div>
          )}
          {data?.length > 0 && (
            <div className={s.slidersContainer}>
              {isDesktop && totalPages > 3 && (
                <div className={s.swiperButtons}>
                  <Suspense>
                    <SwiperButtons
                      onPrevClick={() => {
                        swiperRef.current.slidePrev();
                      }}
                      onNextClick={() => {
                        swiperRef.current.slideNext();
                      }}
                    />
                  </Suspense>
                </div>
              )}

              <Swiper
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
                className={s.slider}
                spaceBetween={16}
                slidesPerView={1}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}
              >
                {data?.map(item => (
                  <SwiperSlide className={s.slideContent} key={item.id}>
                    <div
                      className={`${s.slidePhoto} ${
                        url === 'gallery' ? s.gallery : ''
                      }`}
                    >
                      <img
                        loading="lazy"
                        src={item.media}
                        alt={
                          item.description
                            ? item.description
                            : 'КДШМ М.І.Вериківського досягнення'
                        }
                        onClick={() => {
                          setActiveImgUrl(item.id);
                          openModal();
                        }}
                      />
                    </div>
                    <p className={s.slideText}>{item.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
          {showSelect && !isDesktop && (
            <Suspense>
              <Select
                title="Обрати відділ"
                options={selectOptions}
                changeDepartment={changeDepartment}
              />
            </Suspense>
          )}
        </div>
      </Container>
      {isModalOpen && (
        <Suspense>
          <Modal>
            <img src={activeImg.media} alt={` ${activeImg.description}`} />
          </Modal>
        </Suspense>
      )}
    </section>
  );
};

export default Achievements;
