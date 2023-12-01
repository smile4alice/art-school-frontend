import Container from '@/components/Container/Container';

import { useEffect } from 'react';

//temp data will come from backend
import aboutUsData from '@/constants/aboutSchool/aboutUs.json';
import historyData from '@/constants/aboutSchool/history.json';
import museumData from '@/constants/aboutSchool/museum.json';
console.log('museumData: ', museumData);

import styles from './AboutSchool.module.scss';
import { useMediaQuery } from 'react-responsive';
import Administration from '@/components/main/Administration/Administration';
import Museum from './Museum';
import { Link } from 'react-router-dom';

const AboutSchool = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (isMobile) {
      historyData.slice(0, 1);
    }
  }, [isMobile]);

  return (
    <>
      {/* <h1 className=''>про школу </h1> */}
      <section className={styles.history}>
        <Container>
          <div className={styles.history_contentWrapper}>
            {historyData.map(data => (
              <>
                <div className={styles.history_titleWrapper}>
                  <h2 className="department_title ">Історія школи</h2>
                  <p className={styles.history_text}>{data.description}</p>
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
                  src={data.media}
                  alt=" scholl building  "
                />
              </>
            ))}
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
          <h2 className="department_title">Про нас </h2>
          <div>
            <p>{aboutUsData.description}</p>
            <img src={aboutUsData.media} alt="" />
          </div>
        </Container>
      </section>
      <section className={styles.museum}>
        <Container>
          <h2 className="department_title">Музей Михайла Вериківського</h2>

          <Museum museumData={museumData} />
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
