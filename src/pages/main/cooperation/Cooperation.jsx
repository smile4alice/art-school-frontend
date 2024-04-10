import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import useContactsStore from '@/store/contactsStore';
import data from '@/data/cooperation.json';
import styles from './Cooperation.module.scss';
import Container from '@/components/Container/Container';
import SEO from '@/components/SEO';

const Cooperation = () => {
  const swiperRef = useRef();
  const { getContacts } = useContactsStore();
  const contacts = useContactsStore(state => state.contacts);
  const isLaptop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 678 });
  const isMobile = useMediaQuery({ maxWidth: 678 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        await getContacts();
      } catch (error) {
        console.log(error);
      }
    };
    fetchContacts();
  }, [getContacts]);

  return (
    <>
      <SEO
        title="Співпраця з КДШМ №2 ім. М.І.Вериківського!"
        description="Школа мистецтв Київ. Київська дитяча школа мистецтв. КДШМ #2 ім. М.І.Вериківського. Концертна зала Київ. Студія звукозапису Київ. Виставкова зала Київ."
      />
      <Container>
        <div className={styles.Cooperation}>
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Співпраця</h1>
            <p>
              Уявіть, що Ваш захід проводиться в одній із найкрасивіших
              концертних зал, розрахованих на 288 місць, у самому серці столиці!
              Як по завершенню концерту чи після перегляду вистави щаслива
              публіка йде прогулятися історичним центром міста - Пейзажною
              алеєю, Андріївським узвозом, Київським дитинцем. <br></br>Уявили?
              З нами це можливо! КДШМ #2 ім. М. І. Вериківського гостинно
              запрошує скористатися концертною та виставковою залами закладу, де
              у Вас буде технічна можливість втілити будь-яку сучасну ідею! До
              ваших послуг також шкільна студія звукозапису!
            </p>
            <div className={styles.imagegWrapper}>
              <h2>Концертна зала</h2>
              {(isMobile || isLaptop) && (
                <div className={styles.images}>
                  {data.concertHallImages.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt} />
                  ))}
                </div>
              )}
              {isTablet && !isLaptop && (
                <Swiper
                  className={styles.Slider}
                  spaceBetween={10}
                  slidesPerView={1.5}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={true}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                >
                  {data.concertHallImages.map((slide, index) => (
                    <SwiperSlide key={index} className={styles.Slide}>
                      <img src={slide.url} alt={slide.alt} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className={styles.imagegWrapper}>
              <h2>Студія звукозапису</h2>
              {(isMobile || isLaptop) && (
                <div className={styles.images}>
                  {data.soundRecordImages.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt} />
                  ))}
                </div>
              )}
              {isTablet && !isLaptop && (
                <Swiper
                  className={styles.Slider}
                  spaceBetween={10}
                  slidesPerView={1.5}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={true}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                >
                  {data.soundRecordImages.map((slide, index) => (
                    <SwiperSlide key={index} className={styles.Slide}>
                      <img src={slide.url} alt={slide.alt} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className={styles.imagegWrapper}>
              <h2>Виставкова зала</h2>

              {(isMobile || isLaptop) && (
                <div className={styles.images}>
                  {data.expoHallImages.map((image, index) => (
                    <img key={index} src={image.url} alt={image.alt} />
                  ))}
                </div>
              )}
              {isTablet && !isLaptop && (
                <Swiper
                  className={styles.Slider}
                  spaceBetween={10}
                  slidesPerView={1.5}
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  loop={true}
                  onSwiper={swiper => {
                    swiperRef.current = swiper;
                  }}
                >
                  {data.expoHallImages.map((slide, index) => (
                    <SwiperSlide key={index} className={styles.Slide}>
                      <img src={slide.url} alt={slide.alt} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className={styles.contactsWrapper}>
              <h2>За детальною інформацією звертайтесь:</h2>
              <ul className={styles.contacts}>
                <li>
                  <a
                    href={contacts.map_url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {contacts && contacts.address}
                  </a>
                </li>
                <li>
                  <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cooperation;
