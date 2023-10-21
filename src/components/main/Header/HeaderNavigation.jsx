import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';

import { aboutUs, departmemts } from './departmemts';
import DropDownMenu from './DropDownMenu/DropDownMenu';

const HeaderNavigation = () => {
  const items = [
    { name: 'Афіша', to: '/poster' },
    { name: 'Галерея', to: '/gallery' },
    { name: 'Співпраця', to: '/cooperation' },
    { name: 'Контакти', to: '/contacts' },
  ];
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      <nav className={styles.nav}>
        <div className={styles.navSelectMenu}>
          <DropDownMenu type="Відділення" items={departmemts} />
          <DropDownMenu type="Про нас" items={aboutUs} />
        </div>
        <ul className={styles.navList}>
          {items.map(({ name, to }) => (
            <Link key={name} to={to}>
              {name}
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
