import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useActiveImg } from '@/store/selectImg';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import useSwipe from '@/hooks/useSwipe';
import s from './GalleryDepartments.module.scss';
const SwiperPagination = lazy(() =>
  import('@/components/ui/swiperPagination/swiperPagination')
);
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));
const SwiperButtons = lazy(() =>
  import('@/components/ui/SwiperButtons/SwiperButtons')
);
const Select = lazy(() => import('@/components/ui/Select/Select'));

const GalleryDepartments = ({
  subDepartmentId,
  url,
  showSelect,
  selectOptions,
}) => {
  const sliderRef = useRef(null);
  const { getDepartmentAchievementsPage } = useServicesStore();
  const [totalPages, setTotalPages] = useState(0);
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const [loadingState, setLoadingState] = useState('loading');
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [departmentId, setDepartmentId] = useState(subDepartmentId);
  const size = isDesktop ? 3 : isLaptop ? 2 : 1;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const changeDepartment = id => {
    setDepartmentId(id);
    setCurrentPage(1);
  };

  useEffect(() => {
    setDepartmentId(subDepartmentId);
    setCurrentPage(1);
  }, [subDepartmentId]);

  const setActiveImgUrl = async id => {
    const selectImg = await data.find(item => item.id === id);
    setActiveImg(selectImg);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState('loading');
        const result = await getDepartmentAchievementsPage(
          url,
          departmentId,
          currentPage,
          size
        );
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
  }, [getDepartmentAchievementsPage, url, departmentId, currentPage, size]);

  //зміна сторінки для запиту при натисканні кнопки
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
    <section className={`${s.gallery} `}>
      <h2>Галерея відділу</h2>
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
                <SwiperButtons onPrevClick={prevPage} onNextClick={nextPage} />
              </Suspense>
            </div>
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
      {isModalOpen && (
        <Suspense>
          <Modal accentIcon={true}>
            <img
              src={activeImg?.media}
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

export default GalleryDepartments;
