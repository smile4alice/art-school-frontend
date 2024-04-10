 import Container from '@/components/Container/Container';
import { useEffect } from 'react';
import historyData from '@/data/about/history.json';
import styles from './SchoolHistory.module.scss';
import SEO from '@/components/SEO';
const SchoolHistory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Історія КДШМ №2 ім. М.І.Вериківського"
        description="Школа мистецтв Київ. Київська дитяча школа мистецтв. Історія Київської дитячої школи мистецтв №2 ім. М.І.Вериківського. Історія КДШМ №2 ім. М.І.Вериківського."
      />
      <section>
        <Container>
          <div className={styles.contentWrapper}>
            <div>
              <h1 className={styles.title}>Історія нашої школи</h1>
              <div className={styles.imgWrapper}>
                <p>{historyData[0].description}</p>
                <img src={historyData[0].media} alt="Будівля школи" />
              </div>
              <div>
                {historyData.slice(1, historyData.length - 1).map(text => (
                  <p key={text.id} className={styles.text}>
                    {text.description}
                  </p>
                ))}
                <p className={`${styles.text} ${styles.text_bold}  `}>
                  Запрошуємо і ваших дітей долучитися до родини КДШМ №2 ім.
                  М.І.Вериківського!
                </p>
                <p className={`${styles.text} ${styles.text_bold}  `}>
                  Tворімо історію нашого міста разом!
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SchoolHistory;
