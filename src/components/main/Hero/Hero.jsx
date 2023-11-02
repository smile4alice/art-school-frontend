// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import {
  // Navigation,
  Pagination,
  Keyboard,
} from 'swiper/modules';
import Data from '@/constants/hero.json';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './Hero.module.scss';

const Hero = () => {
  const swiperRef = useRef();

  return (
    <section className={styles.HeroSection}>
      <button
        className={styles.prevSlide}
        onClick={() => swiperRef.current.slidePrev()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      <button
        className={styles.nextSlide}
        onClick={() => swiperRef.current.slideNext()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 320 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
        </svg>
      </button>
      <Swiper
        style={{
          '--swiper-navigation-color': '#d66600',
          '--swiper-navigation-sides-offset': '2.8rem',
          '--swiper-navigation-size': '1.25rem',
          '--swiper-pagination-bullet-horizontal-gap': '0.3rem',
          '--swiper-pagination-bottom': '1rem',
          '--swiper-pagination-bullet-active': '3rem',
        }}
        onSwiper={swiper => {
          swiperRef.current = swiper;
        }}
        // navigation={true}
        pagination={{ clickable: true }}
        // navigation={{
        //   prevEl: '.swiper-button-prev',
        //   nextEl: '.swiper-button-next',
        // }}
        keyboard={true}
        slidesPerView={1}
        spaceBetween={2}
        modules={[
          // Navigation,
          Pagination,
          Keyboard,
        ]}
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
