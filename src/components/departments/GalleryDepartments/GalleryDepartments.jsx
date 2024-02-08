import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';
import Select from '@/components/ui/Select/Select';
import useServicesStore from '@/store/serviseStore';
import s from './GalleryDepartments.module.scss';
import Modal from '@/components/ui/Modal/Modal';
import { useModal } from '@/store/modalStore';
import { useActiveImg } from '@/store/selectImg';
import SwiperPagination from '@/components/ui/swiperPagination/swiperPagination';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
const GalleryDepartments = ({ url, showSelect, selectOptions }) => {
  const sliderRef = useRef(null);
  const { getDepartmentAchievementsPage } = useServicesStore();
  const [totalPages, setTotalPages] = useState(0);
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  const [loadingState, setLoadingState] = useState('loading');
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [departmentId, setDepartmentId] = useState(selectOptions?.[0].id);
  const size = isDesktop ? 3 : isLaptop ? 2 : 1;
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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




  let startX = 0;
  let startY = 0;
  let deltaX = 0;
  let deltaY = 0;

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    deltaX = touch.clientX - startX;
    deltaY = touch.clientY - startY;
  };

  const handleTouchEnd = () => {
    const swipeLength = Math.abs(deltaX);
    const swipeDirectionThreshold = 50;
    if (swipeLength > swipeDirectionThreshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        prevPage();
      } else {
        nextPage();
      }
    }

    // Reset deltas
    deltaX = 0;
    deltaY = 0;
  };


  return (
    <section className={`${s.gallery} `}>
      {showSelect && isDesktop && (
        <Select
          title="Обрати відділ"
          options={selectOptions}
          changeDepartment={changeDepartment}
        />
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
              <SwiperButtons onPrevClick={prevPage} onNextClick={nextPage} />
            </div>
          )}
          <div
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className={s.slider}
          >
            {data?.map(item => (
              <div className={s.slideContent} key={item.id}>
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
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <SwiperPagination
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          )}
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
