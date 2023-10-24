import HeaderContacts from './HeaderContacts';
import HeaderNavigation from './HeaderNavigation';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import HeaderNavigationMobile from './HeaderNavigationMobile';

const Header = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  console.log('windowWidth: ', windowWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <header className={styles.headerWrapper}>
      {windowWidth < 1280 && <HeaderNavigationMobile />}
      <HeaderContacts windowWidth={windowWidth} />
      {windowWidth > 1280 && <HeaderNavigation />}
    </header>
  );
};

export default Header;
