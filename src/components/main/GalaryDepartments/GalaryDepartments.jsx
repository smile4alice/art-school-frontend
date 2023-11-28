import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Container from '@/components/Container/Container';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';
import Select from '@/components/ui/Select/Select';
import useServicesStore from '@/store/serviseStore';
import s from './GalaryDepartments.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const GalaryDepartments = ({
  url,
  departmentId,
  changeDepartment,
  showSelect,
  selectOptions,
}) => {
  const { getDepartmentAchievements } = useServicesStore();
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const swiperGalaryRef = useRef();
  const [loadingState, setLoadingState] = useState('loading');
  const [galaryData, setGalaryData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getDepartmentAchievements(
          url,
          showSelect,
          departmentId
        );
        setGalaryData(result);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getDepartmentAchievements, url, showSelect, departmentId]);

  return (
    <Container>
      <section className={s.galary}>
        {showSelect && isLaptop && (
          <Select
            title="Обрати відділ"
            options={selectOptions}
            changeDepartment={changeDepartment}
          />
        )}
        {loadingState === 'loading' && (
          <div className={s.errorData}>Louding...</div>
        )}
        {loadingState === 'success' &&
        setGalaryData &&
        setGalaryData.length > 0 ? (
          <div className={s.slidersContainer}>
            {isLaptop && (
              <SwiperButtons
                onPrevClick={() => swiperGalaryRef.current.slidePrev()}
                onNextClick={() => swiperGalaryRef.current.slideNext()}
              />
            )}
            <Swiper
              onSwiper={swiper => {
                swiperGalaryRef.current = swiper;
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
              {galaryData.map(item => (
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

export default GalaryDepartments;
