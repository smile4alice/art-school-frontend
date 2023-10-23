// import imageHero1 from '/public/hero/building.JPG';
// import imageHero2 from '/public/hero/art-building.JPG';
// import imageHero3 from '/public/hero/platform.JPG';
// import React, { useRef, useState } from 'react';
// import Container from '@/components/Container/Container';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { hero } from '@/constants/hero.js';

import 'swiper/css';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        slidesPerView={1}
        spaceBetween={10}
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
                backgroundImage: `url("public/hero/building.jpg")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '60vh', // Set the height as per your design
              }}
            />
            {/* <img src="/hero/building.jpg" alt="" className={styles.HeroImage} /> */}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
