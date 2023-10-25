// import React, { useRef, useState } from 'react';
// import 'swiper/swiper-bundle.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Keyboard } from 'swiper/modules';
import Data from '@/constants/hero.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.HeroSection}>
      <Swiper
        style={{
          '--swiper-navigation-color': '#d66600',
          '--swiper-navigation-sides-offset': '2.8rem',
          '--swiper-navigation-size': '1.25rem',
          '--swiper-pagination-bullet-horizontal-gap': '1rem',
          '--swiper-pagination-bottom': '1rem',
        }}
        navigation={true}
        pagination={{ clickable: true }}
        // navigation={{
        //   prevEl: '.swiper-button-prev',
        //   nextEl: '.swiper-button-next',
        // }}
        keyboard={true}
        slidesPerView={1}
        spaceBetween={2}
        modules={[Navigation, Pagination, Keyboard]}
        className={styles.SliderStyle}
      >
        {Data.map((result, index) => (
          <SwiperSlide key={index} className={styles.SlideStyle}>
            <img src={result.img} alt="hero" className={styles.HeroImage} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.HeroTitle}>
        <h1 className={styles.HeroPrimaryTitle}>
          Київська дитяча школа мистецтв №2
          <span className={styles.HeroSecondaryTitle}>
            {' '}
            імені Михайла Вериківського
          </span>
        </h1>
      </div>
    </section>
  );
};

export default Hero;
