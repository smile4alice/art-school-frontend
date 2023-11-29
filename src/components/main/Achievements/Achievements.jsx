import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';
import Select from '@/components/ui/Select/Select';
import useServicesStore from '@/store/serviseStore';
import s from './Achievements.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Achievements = ({
  title,
  url,
  departmentId,
  changeDepartment,
  showSelect,
  selectOptions,
}) => {
  const { getDepartmentAchievements } = useServicesStore();
  const isDextop = useMediaQuery({ minWidth: 1280 });
  const swiperRef = useRef();
  const [achievementsData, setAchievementsData] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getDepartmentAchievements(
          url,
          showSelect,
          departmentId
        );
        setAchievementsData(result);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getDepartmentAchievements, url, showSelect, departmentId]);

  return (
      <section className={s.achievements}>
        <h2>{title}</h2>
        {showSelect && isDextop && (
          <Select
            title="Обрати відділ"
            options={selectOptions}
            changeDepartment={changeDepartment}
          />
        )}
        {loadingState === 'loading' && (
          <div className={s.errorData}>Loading...</div>
        )}
        {loadingState === 'success' ? (
          achievementsData && achievementsData.length > 0 ? (
            <div className={s.slidersContainer}>
              {isDextop && (
                <SwiperButtons
                  onPrevClick={() => swiperRef.current.slidePrev()}
                  onNextClick={() => swiperRef.current.slideNext()}
                />
              )}
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                className={s.slider}
                modules={[Pagination]}
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
                pagination={{ clickable: true }}
                loop={true}
              >
                {achievementsData.map((item) => (
                  <SwiperSlide className={s.slideContent} key={item.id}>
                    <div className={s.slidePhoto}>
                      <img src={item.media} alt={item.description} />
                    </div>
                    <p className={s.slideText}>{item.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className={s.errorData}>Дані тимчасово відсутні</div>
          )
        ) : (
          loadingState === 'error' && (
            <div className={s.errorData}>Дані тимчасово відсутні</div>
          )
        )}
         {showSelect && !isDextop && (
          <Select
            title="Обрати відділ"
            options={selectOptions}
            changeDepartment={changeDepartment}
          />
        )}
      </section>
  );
};

export default Achievements;
