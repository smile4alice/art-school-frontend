import { useState, useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SwiperButtons from '@/components/ui/SwiperButtons/SwiperButtons';

import useServicesStore from '@/store/serviseStore';
import s from './Administration.module.scss';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

const Administration = () => {
  const { getAdministrationData } = useServicesStore();
  const isDextop = useMediaQuery({ minWidth: 1280 });
  const swiperAdministrationRef = useRef();
  const [loadingState, setLoadingState] = useState('loading');
  const [administrationData, setAdministrationData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getAdministrationData();
        console.log('result : ', result);
        setAdministrationData(result);
        setLoadingState('success');
      } catch (error) {
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getAdministrationData]);

  return (
    <section className={s.galary}>
      {loadingState === 'loading' && (
        <div className={s.errorData}>Loading...</div>
      )}
      {loadingState === 'success' ? (
        administrationData && administrationData.length > 0 ? (
          <div className={s.slidersContainer}>
            {isDextop && (
              <SwiperButtons
                onPrevClick={() => swiperAdministrationRef.current.slidePrev()}
                onNextClick={() => swiperAdministrationRef.current.slideNext()}
              />
            )}
            <Swiper
              onSwiper={swiper => {
                swiperAdministrationRef.current = swiper;
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
              {administrationData.map(item => (
                <SwiperSlide className={s.slideContent} key={item.id}>
                  <div
                    style={{ width: 300, height: 300, background: 'red' }}
                  ></div>
                  <div className={s.slidePhoto}>
                    <img src={item.photo} alt={item.description} />
                  </div>
                  <p className={s.slideText}>{item.full_name}</p>
                  <p className={s.slideText}>{item.position}</p>[ ]
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
    </section>
  );
};

export default Administration;
