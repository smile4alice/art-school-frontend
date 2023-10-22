import NavLinkButton from '../../ui/NavLinkButton/NavLinkButton';

import styles from './History.module.scss';

const History = () => {
  const url = 'https://www.example.com';
  const buttonName = 'Читати більше';

  return (
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <p className={`${styles.title} sectionTitle`}>Історія школи</p>
          <p className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <NavLinkButton title={buttonName} link={url} />
        </div>
        <div className={styles.img_container}>
          <img src="/school.png" alt="school-building" />
        </div>
      </div>
  );
};

export default History;
