import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Container from '@/components/Container/Container';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';
import Select from '@/components/ui/Select/Select';
import s from './Achievements.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Achievements = ({ title, url, showSelect, selectOptions }) => {
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const swiperRef = useRef();
  const [achievementsData, setAchievementsData] = useState([]);
  const [departmen, setDepartmen] = useState(selectOptions ? selectOptions[0].id : '');
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    const server = `https://art-school-backend.vercel.app/api/v1/${url}${showSelect ? departmen : ''}?page=1&size=7`;
    console.log(server);
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const response = await fetch(server);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        if (showSelect === false) {
          setAchievementsData(result.items);
        } else {
          setAchievementsData(result);
        }
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [departmen, url, showSelect]);

  const changeDepartment = url => {
    setDepartmen(url);
  };

  return (
    <Container>
      <section className={s.achievements}>
        <h2>{title}</h2>
        {showSelect && isLaptop && (
          <Select
            title="Обрати відділ"
            options={selectOptions}
            changeDepartment={changeDepartment}
          />
        )}
        {loadingState === 'loading' && <p>Loading...</p>}
        {loadingState === 'success' && achievementsData && achievementsData.length > 0 ? (
            <div className={s.slidersContainer}>
              {isLaptop && (
                <SwiperButtons
                  onPrevClick={() => swiperRef.current.slidePrev()}
                  onNextClick={() => swiperRef.current.slideNext()}
                />
              )}
              <Swiper
                onSwiper={swiper => {
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
                {achievementsData.map(item => (
                  <SwiperSlide className={s.slideContent} key={item.id}>
                    <div className={s.slidePhoto}>
                      <img src={item.media} alt="achievement photo" />
                    </div>
                    <p className={s.slideText}>{item.description}</p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className={s.errorData}>Дані тимчасово відсутні</div>
          )}
      </section>
    </Container>
  );
};

export default Achievements;
