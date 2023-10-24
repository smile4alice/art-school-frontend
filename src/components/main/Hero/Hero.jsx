// import imageHero1 from '/public/hero/building.JPG';
// import imageHero2 from '/public/hero/art-building.JPG';
// import imageHero3 from '/public/hero/platform.JPG';
// import React, { useRef, useState } from 'react';
// import Container from '@/components/Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import { hero } from '@/constants/hero.js';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    // <Container>
    <section className={styles.HeroSection}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#d66600',
          '--swiper-navigation-background-color': '#00ff0d',
          '--swiper-navigation-top-offset': '50%',
          '--swiper-navigation-size': '20px',
          '--swiper-navigation-weight': '900',
          '--swiper-pagination-color': '#ffffff',
          '--swiper-pagination-active-color': '#007bff',
        }}
        navigation={true}
        pagination={{
          dynamicBullets: true,
        }}
        // navigation={{
        //   prevEl: '.swiper-button-prev',
        //   nextEl: '.swiper-button-next',
        // }}
        mousewheel={true}
        keyboard={true}
        slidesPerView={1}
        spaceBetween={2}
        modules={[Navigation, Pagination, Keyboard]}
        className={styles.SliderStyle}
        // pagination="true"
        // effect="coverflow"
        // grab-cursor="true"
        // centered-slides="true"
        // slides-per-view="auto"
        // coverflow-effect-rotate="50"
        // coverflow-effect-stretch="0"
        // coverflow-effect-depth="100"
        // coverflow-effect-modifier="1"
        // coverflow-effect-slide-shadows="true"
      >
        {hero.map((some, index) => (
          <SwiperSlide
            key={index}
            // className={styles.Slide}
          >
            <div
              className={styles.HeroImage}
              style={{
                backgroundImage: `url("hero/building.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '615px', // Set the height as per your design
              }}
            />
            {/* <img src="/hero/building.jpg" alt="" className={styles.HeroImage} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
    // </Container>
  );
};

export default Hero;
