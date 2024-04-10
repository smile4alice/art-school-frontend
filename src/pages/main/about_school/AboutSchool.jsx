import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import Container from '@/components/Container/Container';
import Administration from '@/pages/main/about_school/Administration/Administration';
import Museum from './Museum';

import historyData from '@/data/about/history.json';
import museumData from '@/data/about/museum.json';
import SEO from '@/components/SEO';

import styles from './AboutSchool.module.scss';

const AboutSchool = () => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="КДШМ №2 ім. М.І.Вериківського - про школу."
        description="Київська дитяча школа мистецтв №2 ім. М.І.Вериківського. КДШМ №2 ім. М.І.Вериківського. Дитяча школа мистецтв Київ.  Історія Київської дитячої школи мистецтв."
      />
      <section className={`${styles.history} section`}>
        <Container>
          <h1 className={styles.topTitle}>Про нас</h1>
          <div className={styles.history_wrapper}>
            <div className={styles.history_contentWrapper}>
              <div className={styles.history_textWrapper}>
                <h2 className={styles.department_title}>Історія школи</h2>
                <p className={styles.history_content_text}>
                  {historyData[0].description}
                </p>
                {isDesktop && (
                  <Link
                    className={styles.readMoreButton}
                    to="/about-school-history"
                  >
                    Читати більше
                  </Link>
                )}
              </div>
              <img
                className={styles.history_content_img}
                src={historyData[0].media}
                alt="Scholl building  "
              />
            </div>

            {!isDesktop && (
              <Link
                className={styles.readMoreButton}
                to="/about-school-history"
              >
                Читати більше
              </Link>
            )}
          </div>
        </Container>
      </section>

      <section className={`${styles.museum} section`} id="museum">
        <Container>
          <div className={styles.museum_contentWrapper}>
            <h2 className="department_title">Музей Михайла Вериківського</h2>
            <Museum museumData={museumData} />
          </div>
        </Container>
      </section>
      <section className={styles.administration} id="administration">
        <Container>
          <Administration />
        </Container>
      </section>
    </>
  );
};

export default AboutSchool;
