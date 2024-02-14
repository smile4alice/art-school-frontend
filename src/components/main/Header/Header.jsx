import HeaderContacts from './HeaderContacts';
import HeaderNavigation from './HeaderNavigation';

import styles from './Header.module.scss';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Header = ({ contacts }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(true);
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
    <header className={clsx(styles.headerWrapper, show ? '' : styles.hidden)}>
      {windowWidth >= 1280 && (
        <HeaderContacts show={show} setShow={setShow} contacts={contacts} />
      )}
      <HeaderNavigation windowWidth={windowWidth} contacts={contacts} />
    </header>
  );
};

export default Header;
