import { useEffect, useState } from 'react';
import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';
import NavList from './NavList/NavList';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import BurgerIcon from '@/components/Icons/BurgerIcon';

const HeaderNavigation = ({ windowWidth }) => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false);

  const handelClickBurgerButton = () => setShowBurgerMenu(!showBurgerMenu);

  useEffect(() => {
    const closeOnESC = event => {
      // console.log('event.code : ', event.code);
      if (event.code === 'Escape') {
        setShowBurgerMenu(!showBurgerMenu);
      }
    };
    window.addEventListener('keydown', closeOnESC);
    return () => {
      window.removeEventListener('keydown', closeOnESC);
    };
  }, [showBurgerMenu]);

  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      {windowWidth > 1280 ? (
        <NavList />
      ) : (
        <button
          aria-label=" navigation menu"
          tabIndex="0"
          className={styles.burgerButton}
          type="button"
          onClick={handelClickBurgerButton}
        >
          <BurgerIcon />
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
