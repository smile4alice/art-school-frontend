// import React, { useRef, useState } from 'react';
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
          '--swiper-pagination-bullet-horizontal-gap': '0.3rem',
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
        {Data.map((slide, index) => (
          <SwiperSlide key={index} className={styles.SlideStyle}>
            <img src={slide.img} alt="hero" className={styles.HeroImage} />
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
      <div className={styles.HeroEvent}>
        <div className={styles.HeroEventTop}>
          <p className={styles.HeroEventName}>афіша</p>
          <a
            href="https://www.google.com.ua/"
            rel="link"
            className={styles.HeroEventLink}
          >
            Дивитися всі події
          </a>
        </div>
        <h3 className={styles.HeroEventTitle}>
          документальна вистава “обличчя кольору війни”
        </h3>
        <p className={styles.HeroEventInfo}>
          благодійний показ на підтримку зсу. вистава відбудеться 14.10 О 16:00
        </p>
      </div>
    </section>
  );
};

export default Hero;
