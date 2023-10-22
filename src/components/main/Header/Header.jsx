import HeaderContacts from './HeaderContacts';
import HeaderNavigation from './HeaderNavigation';

import styles from './Header.module.scss';
import { useEffect } from 'react';

const Header = () => {

  return (
    <header className={styles.headerWrapper}>
      <HeaderContacts />
      <HeaderNavigation />
    </header>
  );
};

export default Header;
