import { useState } from 'react';
import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';
import NavList from './NavList/NavList';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import BurgerIcon from '@/components/Icons/BurgerIcon';

const HeaderNavigation = ({ windowWidth }) => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const handelClickBurgerButton = showBurgerMenu =>
    setShowBurgerMenu(!showBurgerMenu);
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      {windowWidth > 1280 ? (
        <NavList />
      ) : (
        <button
          className={styles.burgerButton}
          type="button"
          onClick={() => handelClickBurgerButton(showBurgerMenu)}
        >
          <BurgerIcon  />
        </button>
      )}

      <BurgerMenu
        showBurgerMenu={showBurgerMenu}
        setShowBurgerMenu={setShowBurgerMenu}
      />
    </div>
  );
};

export default HeaderNavigation;
