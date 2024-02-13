import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import useServicesStore from '@/store/serviseStore';
import s from './GalleryDepartmentsSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);

const GalleryDepartmentsSwiper = ({ subDepartmentId, url }) => {
  const swiperRef = useRef();
  const { getDepartmentAchievementsPage } = useServicesStore();
  const [totalPages, setTotalPages] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const departmentId = subDepartmentId;

  const [data, setData] = useState([]);
  //розмір сторінки для першого запиту
  const firstFetchPageSize = isDesktop ? 3 : isLaptop ? 2 : 1;

  const [currentPage, setCurrentPage] = useState(1); //сторінка в запиті
  const pageSize = 1; //розмір запиту
  const [currentIndex, setCurrentIndex] = useState(1); //активний слайд

  useEffect(() => {
    const firstFetchData = async () => {
      try {
        const result = await getDepartmentAchievementsPage(
          url,
          1,
          currentPage,
          firstFetchPageSize
        );
        setData(result.items);
        setCurrentPage(4);
      } catch (error) {
        console.log(error);
        setData([]);
      }
    };
    firstFetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchNextData = async () => {
      if (currentPage > 3) {
        try {
          const result = await getDepartmentAchievementsPage(
            url,
            departmentId,
            currentPage,
            pageSize
          );
          setData(prevData => [...prevData, ...result.items]);
          setTotalPages(result.pages);
        } catch (error) {
          console.log(error);
          //setData([]);
        }
      }
    };
    fetchNextData();
    //eslint-disable-next-line
  }, [getDepartmentAchievementsPage, url, departmentId, currentPage]);

  // swiper navigation
  const handlePrevSlide = () => {
    console.log('prev slide');
    if (currentIndex > 1) {
      setCurrentIndex(prevValue => prevValue - 1);
    } else {
      setCurrentIndex(totalPages);
    }
  };
  const handleNextSlide = () => {
    console.log('next slide');
    if (currentIndex < totalPages) {
      setCurrentIndex(prevValue => prevValue + 1);
    } else {
      setCurrentIndex(1);
    }
    if (currentPage < totalPages + 2 && currentPage >= currentIndex) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <section className={`${s.gallery} `}>
      {data?.length > 0 && (
        <div className={s.slidersContainer}>
          {isDesktop && totalPages > 1 && (
            <div className={s.swiperButtons}>
              <Suspense>
                <SwiperButtons
                  onPrevClick={() => {
                    handlePrevSlide();
                    swiperRef.current.slidePrev(); //перелистування назад
                  }}
                  onNextClick={() => {
                    handleNextSlide();
                    swiperRef.current.slideNext(); //перелистування вперед
                  }}
                />
              </Suspense>
            </div>
          )}

          {data?.length > 0 && (
            <div className={s.slidersContainer}>
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
                slidesPerView={3}
                loop={true}
              >
                {data?.map(item => (
                  <SwiperSlide
                    className={s.slideContent}
                    key={item.id}
                    noSwiping={true}
                  >
                    <div className={s.slidePhoto}>
                      <img src={item.media} alt={item.description} />
                    </div>
                    <p className={s.slideText}>{item.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GalleryDepartmentsSwiper;

/*
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import useServicesStore from '@/store/serviseStore';
//import useSwipe from '@/hooks/useSwipe';
import s from './GalleryDepartmentsSwiper.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';

const SwiperPagination = lazy(() =>
  import('@/components/ui/swiperPagination/swiperPagination')
);

const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);
import useSwipe from '@/hooks/useSwipe';
const GalleryDepartmentsSwiper = ({ subDepartmentId, url }) => {
  const swiperRef = useRef();
  const { getDepartmentAchievementsPage } = useServicesStore();
  const [totalPages, setTotalPages] = useState(0);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const departmentId = subDepartmentId;

  const [data, setData] = useState([]);
  //розмір сторінки для першого запиту
  const firstFetchPageSize = isDesktop ? 3 : isLaptop ? 2 : 1;

  const [currentPage, setCurrentPage] = useState(1); //сторінка в запиті
  const pageSize = 1; //розмір запиту
  const [currentIndex, setCurrentIndex] = useState(1); //активний слайд

  useEffect(() => {
    const firstFetchData = async () => {
      try {
        const result = await getDepartmentAchievementsPage(
          url,
          1,
          currentPage,
          firstFetchPageSize
        );
        setData(result.items);
        setCurrentPage(4);
      } catch (error) {
        console.log(error);
      }
    };
    firstFetchData();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchNextData = async () => {
      if (currentPage > 3) {
        console.log('FetchNextData');
        try {
          const result = await getDepartmentAchievementsPage(
            url,
            departmentId,
            currentPage,
            pageSize
          );
          setData(prevData => [...prevData, ...result.items]);
          setTotalPages(result.pages);
        } catch (error) {
          console.log(error);
          // setData([]);
        }
      }
    };
    fetchNextData();
    //eslint-disable-next-line
  }, [getDepartmentAchievementsPage, url, departmentId, currentPage]);

  // swiper navigation
  const handlePrevSlide = () => {
    console.log('prev slide');
    if (currentIndex > 1) {
      setCurrentIndex(prevValue => prevValue - 1);
    } else {
      setCurrentIndex(totalPages);
    }
    swiperRef.current.slidePrev(); //перелистування назад
  };
  const handleNextSlide = () => {
    console.log('next slide');
    if (currentIndex < totalPages) {
      setCurrentIndex(prevValue => prevValue + 1);
    } else {
      setCurrentIndex(1);
    }
    if (currentPage < totalPages + 2 && currentPage >= currentIndex) {
      setCurrentPage(prevPage => prevPage + 1);
    }
    swiperRef.current.slideNext(); //перелистування вперед
  };

  //console.log(`currentPage ${currentPage}`);
  //console.log(`pageSize ${pageSize}`);
  //console.log(`currentIndex ${currentIndex}`);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
    handlePrevSlide,
    handleNextSlide
  );
  return (
    <section className={`${s.gallery} `}>
      {data?.length > 0 && (
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={s.slidersContainer}
        >
          {isDesktop && totalPages > 1 && (
            <div className={s.swiperButtons}>
              <Suspense>
                <SwiperButtons
                  onPrevClick={handlePrevSlide}
                  onNextClick={handleNextSlide}
                />
              </Suspense>
            </div>
          )}

          {data?.length > 0 && (
            <div className={s.slidersContainer}>
              <Swiper
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                }}
                modules={[Pagination]}
                normalizeSlideIndex={true}
                pagination={{
                  type: 'bullets',
                  dynamicBullets: true,
                  dynamicMainBullets: 3,
                }}
                className={s.slider}
                spaceBetween={16}
                slidesPerView={3}
                loop={true}
              >
                {data?.map(item => (
                  <SwiperSlide
                    className={s.slideContent}
                    key={item.id}
                    noSwiping={true}
                  >
                    <div className={s.slidePhoto}>
                      <img src={item.media} alt={item.description} />
                    </div>
                    <p className={s.slideText}>{item.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GalleryDepartmentsSwiper;
*/

/*

 {totalPages > 1 && (
            <Suspense>
              <SwiperPagination
                totalPages={totalPages}
                currentPage={currentIndex}
                handlePageChange={handlePageChange}
              />
            </Suspense>
          )}


 <div
            className={s.slider}
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {data?.map(item => (
              <div className={s.slideContent} key={item.id}>
                <div className={s.slidePhoto}>
                  <img
                    src={item.media}
                    alt={
                      item.description
                        ? item.description
                        : 'КДШМ М.І.Вериківського фото'
                    }
                    onClick={() => {
                      setActiveImgUrl(item.id);
                      openModal();
                    }}
                  />
                </div>
                <p className={s.slideText}>{item.description}</p>
              </div>
            ))}
          </div>




/*
import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';
import Select from '@/components/ui/Select/Select';
import useServicesStore from '@/store/serviseStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import s from './GalleryDepartments.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Modal from '@/components/ui/Modal/Modal';
import { useModal } from '@/store/modalStore';
import { useActiveImg } from '@/store/selectImg';

const GalleryDepartments = ({
  url,
  showSelect,
  selectOptions,
}) => {
  const { getDepartmentAchievements } = useServicesStore();
  const gallery = useServicesStore(state => state.gallery);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const swiperGalleryRef = useRef();
  const [loadingState, setLoadingState] = useState('loading');
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [departmentId, setDepartmentId] = useState(selectOptions?.[0].id);

  const changeDepartment = id => {
    setDepartmentId(id);
  };

  const setActiveImgUrl = async id => {
    const selectImg = await gallery.find(item => item.id === id);
    setActiveImg(selectImg);
   
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        await getDepartmentAchievements(url, departmentId);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getDepartmentAchievements, url, departmentId]);

  return (
    <section className={`${s.gallery} `}>
      {showSelect && isDesktop && (
        <Select
          title="Обрати відділ"
          options={selectOptions}
          changeDepartment={changeDepartment}
        />
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
      {loadingState === 'success' && gallery?.length > 0 && (
        <div className={s.slidersContainer}>
          {isDesktop && gallery?.length > 3 && (
            <SwiperButtons
              onPrevClick={() => swiperGalleryRef.current.slidePrev()}
              onNextClick={() => swiperGalleryRef.current.slideNext()}
            />
          )}

          <Swiper
            onSwiper={swiper => {
              swiperGalleryRef.current = swiper;
            }}
            className={s.slider}
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              el: '.swiper-pagination-gallery',
              clickable: true,
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {gallery?.map(item => (
              <SwiperSlide className={s.slideContent} key={item.id}>
                <div className={s.slidePhoto}>
                  <img
                    src={item.media}
                    alt={item.description}
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
          <div className="swiper-pagination swiper-pagination-gallery"></div>
        </div>
      )}
      {showSelect && !isDesktop && (
        <Select
          title="Обрати відділ"
          options={selectOptions}
          changeDepartment={changeDepartment}
        />
      )}

      {isModalOpen && (
        <Modal>
          <img src={activeImg?.media} alt={` ${activeImg.description}`} />
        </Modal>
      )}
    </section>
  );
};

export default GalleryDepartments;
*/
