import { useState, useEffect, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import useServicesStore from '@/store/serviseStore';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import s from './Achievements.module.scss';
import Container from '@/components/Container/Container';
import { useModal } from '@/store/modalStore';
import { useActiveImg } from '@/store/selectImg';
import useSwipe from '@/hooks/useSwipe';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));
const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);
const SwiperPagination = lazy(() =>
  import('@/components/ui/swiperPagination/swiperPagination')
);
const Select = lazy(() => import('@/components/ui/Select/Select'));

const Achievements = ({ title, url, showSelect, selectOptions }) => {
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const { getMainAchievementsPage, getDepartmentAchievementsPage } =
    useServicesStore();
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [departmentId, setDepartmentId] = useState(selectOptions?.[0].id);
  const [loadingState, setLoadingState] = useState('loading');
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const size = isDesktop ? 3 : isLaptop ? 2 : 1;

  const changeDepartment = id => {
    setDepartmentId(id);
    setCurrentPage(1);
  };

  const setActiveImgUrl = async id => {
    const selectImg = await data.find(item => item.id === id);
    setActiveImg(selectImg);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState('loading');
        let result;
        if (url === 'achievements') {
          result = await getMainAchievementsPage(url, currentPage, size);
        } else {
          result = await getDepartmentAchievementsPage(
            url,
            departmentId,
            currentPage,
            size
          );
        }
        setData(result.items);
        setTotalPages(result.pages);
        setLoadingState('success');
      } catch (error) {
        console.log(error);
        setData([]);
        setLoadingState('error');
      }
    };
    fetchData();
  }, [
    getMainAchievementsPage,
    getDepartmentAchievementsPage,
    url,
    departmentId,
    currentPage,
    size,
  ]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const prevPage = () => {
    currentPage > 1
      ? setCurrentPage(currentPage - 1)
      : setCurrentPage(totalPages);
  };
  const nextPage = () => {
    currentPage < totalPages
      ? setCurrentPage(currentPage + 1)
      : setCurrentPage(1);
  };
  //свайп по блоку
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(
    prevPage,
    nextPage
  );

  return (
    <section className={`${s.achievements}`}>
      <Container>
        <div className={s.achievementsWrapper}>
          <h2>{title}</h2>
          {showSelect && isDesktop && (
            <Suspense>
              <Select
                title="Обрати відділ"
                options={selectOptions}
                changeDepartment={changeDepartment}
              />
            </Suspense>
          )}

          {loadingState === 'error' && (
            <div className={`${s.errorData} errorData`}>
              <Placeholder />
            </div>
          )}
          {data?.length > 0 && (
            <div className={s.slidersContainer}>
              {isDesktop && totalPages > 1 && (
                <div className={s.swiperButtons}>
                  <Suspense>
                    <SwiperButtons
                      onPrevClick={prevPage}
                      onNextClick={nextPage}
                    />
                  </Suspense>
                </div>
              )}

              <div
                className={`${s.slider} ${
                  loadingState === 'loading' ? s.fadeEnter : s.fadeEnterActive
                }`}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {data?.map(item => (
                  <div className={s.slideContent} key={item.id}>
                    <div className={s.slidePhoto}>
                      <img
                        loading="lazy"
                        src={item.media}
                        alt={item.description ? item.description : 'КДШМ М.І.Вериківського досягнення'}
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
              {totalPages > 1 && (
                <Suspense>
                  <SwiperPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                  />
                </Suspense>
              )}
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
/*{loadingState === 'loading' && (
                      <Spinner/>
                    )}

 <section className={`${s.achievements}`}>
      <Container>
        <div className={s.achievementsWrapper}>
          <h2>{title}</h2>
          {showSelect && isDesktop && (
            <Suspense>
              <Select
                title="Обрати відділ"
                options={selectOptions}
                changeDepartment={changeDepartment}
              />
            </Suspense>
          )}
         
          {loadingState === 'error' && (
            <div className={`${s.errorData} errorData`}>
              <Placeholder />
            </div>
          )}
          {loadingState === 'success' && data?.length > 0 && (
            <div className={s.slidersContainer}>
              {isDesktop && data?.length > 3 && (
                <Suspense>
                  <SwiperButtons
                    onPrevClick={() => swiperRef.current.slidePrev()}
                    onNextClick={() => swiperRef.current.slideNext()}
                  />
                </Suspense>
              )}

              <Swiper
                onSwiper={swiper => {
                  swiperRef.current = swiper;
                }}
                className={s.slider}
                modules={[Pagination]}
                spaceBetween={16}
                slidesPerView={1}
                pagination={{ clickable: true }}
                //loop={true}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                }}
              >
                {achievements?.map(item => (
                  <SwiperSlide
                    className={`swiper-lazy ${s.slideContent}`}
                    key={item.id}
                  >
                    <>
                      <div className={s.slidePhoto}>
                        <img
                          loading="lazy"
                          src={item.media}
                          alt={item.description}
                          onClick={() => {
                            setActiveImgUrl(item.id);
                            openModal();
                          }}
                        />
                      </div>
                      <p className={s.slideText}>{item.description}</p>
                    </>
                    <div className="swiper-lazy-preloader"></div>
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







 /*
          {loadingState === 'loading' && (
            <div className={s.errorData}>
              <Spinner />
            </div>
          )}

*/
