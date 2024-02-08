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

const GalleryDepartments = ({ url, showSelect, selectOptions }) => {
  const { getDepartmentAchievements } = useServicesStore();
  //const gallery = useServicesStore(state => state.gallery);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const swiperGalleryRef = useRef();
  const [loadingState, setLoadingState] = useState('loading');
  const { isModalOpen, openModal } = useModal();
  const { activeImg, setActiveImg } = useActiveImg();
  const [departmentId, setDepartmentId] = useState(selectOptions?.[0].id);

  const [data, setData] = useState([]);

  const changeDepartment = id => {
    setDepartmentId(id);
  };
  const setActiveImgUrl = async id => {
    const selectImg = await data.find(item => item.id === id);
    setActiveImg(selectImg);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getDepartmentAchievements(url, departmentId);
        console.log(result);
        setData(result);
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
      {loadingState === 'success' && data?.length > 0 && (
        <div className={s.slidersContainer}>
          {isDesktop && data?.length > 3 && (
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
            {data?.map(item => (
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
