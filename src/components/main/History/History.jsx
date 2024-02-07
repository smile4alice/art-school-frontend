// import { Link } from 'react-router-dom';
import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import historyData from '@/data/about/history.json';
import styles from './History.module.scss';

const History = () => {
  const url = '/about-school-history';
  const buttonName = 'Читати більше';

  return (
    <section className="section">
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.info}>
            <h2 className={`${styles.title} sectionTitle`}>Історія школи</h2>
            <p className={styles.text}>{historyData[0].description}</p>
          </div>
          <div className={styles.buttonContainer}>
            <NavLinkButton text={buttonName} href={url} />
          </div>
          <div className={styles.img_container}>
            <img
              src="/school.webp"
              alt="Київська дитяча школа мистецтв № 2 імені M. I.  Вериківського»"
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default History;
