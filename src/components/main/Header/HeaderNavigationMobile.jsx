import Logo from '@/components/Logo/Logo';

import styles from './Header.module.scss';
const HeaderNavigationMobile = () => {
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      <div className={styles.burgerIcon}> burger</div>
    </div>
  );
};

export default HeaderNavigationMobile;
