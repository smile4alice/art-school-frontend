import Container from '@/components/Container/Container';

import { useEffect } from 'react';

//temp data will come from backend
import aboutUsData from '@/constants/aboutSchool/aboutUs.js';
import historyData from '@/constants/aboutSchool/history.js';
import museumData from '@/constants/aboutSchool/museum.json';

import styles from './AboutSchool.module.scss';
import { useMediaQuery } from 'react-responsive';
import Administration from '@/components/main/Administration/Administration';
import Museum from './Museum';
import { Link } from 'react-router-dom';

const AboutSchool = () => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <h1 className=''>про школу </h1> */}|
      <section className={styles.history}>
        <Container>
          <div className={styles.history_contentWrapper}>
            <h2 className="department_title ">Історія школи</h2>
            <div className={styles.history_titleWrapper}>
              <p className={styles.history_text}>{historyData.description}</p>
              {isDesktop && (
                <Link
                  className={styles.readMoreButton}
                  to="/about_school_history"
                >
                  Читати більше
                </Link>
              )}
            </div>

            <img
              className={styles.img}
              src={historyData.media}
              alt=" scholl building  "
            />

            {!isDesktop && (
              <Link
                className={styles.readMoreButton}
                to="/about_school_history"
              >
                Читати більше
              </Link>
            )}
          </div>
        </Container>
      </section>
      <section className={styles.aboutUs}>
        <Container>
          <div className={styles.aboutUs_wrapper}>
            <div>
              <h2 className="department_title">Про нас </h2>
              <div className={styles.aboutUs_contentWrapper}>
                <p>{aboutUsData.description1}</p>
                <img
                  className={styles.aboutUs_img}
                  src={aboutUsData.media}
                  alt=""
                />
              </div>
            </div>

            <div className={styles.benefits}>
              <ul className={styles.benefits_list}>
                {aboutUsData.benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefits_listItem}>
                    <p className={styles.benefits_listItem_text}> {benefit}</p>
                  </li>
                ))}
              </ul>
              <p>{aboutUsData.description2}</p>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.museum}>
        <Container>
          <div className={styles.museum_contentWrapper}>
            <h2 className="department_title">Музей Михайла Вериківського</h2>

            <Museum museumData={museumData} />
          </div>
        </Container>
      </section>
      <section className={styles.administration}>
        <Container>
          <h2 className="department_title">Адміністрація школи</h2>
          <Administration />
        </Container>
      </section>
    </>
  );
};

export default AboutSchool;
