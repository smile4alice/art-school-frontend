import Container from '@/components/Container/Container';

import { useEffect } from 'react';

//temp data will come from backend
import aboutUsData from '@/constants/aboutUs.json';
import historyData from '@/constants/history.json';
import museumData from '@/constants/museum.json';
console.log('museumData: ', museumData);

import styles from './AboutSchool.module.scss';
import { useMediaQuery } from 'react-responsive';
import Administration from '@/components/main/Administration/Administration';
import Museum from './Museum';

const AboutSchool = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (isMobile) {
      historyData.slice(0, 1);
    }
  }, [isMobile]);

  return (
    <div className={styles.contentWrapper}>
      {/* <h1 className=''>про школу </h1> */}
      <section className={styles.history}>
        <Container>
          <h2 className="department_title ">Історія школи</h2>
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
    </div>
  );
};

export default AboutSchool;
