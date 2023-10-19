import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';

const HeaderNavigation = () => {
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      <nav>
        <ul className={styles.navList}>
          <li>Відділення</li>
          <li>Про нас</li>
          <li>Наші події</li>
          <li>Афіша</li>
          <li>Галерея</li>
          <li>Співпраця</li>
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
