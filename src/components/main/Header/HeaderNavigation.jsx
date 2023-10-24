import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';
import NavList from './NavList/NavList';

const HeaderNavigation = () => {
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      <NavList />
    </div>
  );
};

export default HeaderNavigation;
