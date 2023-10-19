import Container from '../../Container/Container';

import HeaderContacts from './HeaderContacts';
import HeaderNavigation from './HeaderNavigation';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <Container>
      <header className={styles.headerWrapper}>
        <HeaderContacts />
        <HeaderNavigation />
      </header>
    </Container>
  );
};

export default Header;
