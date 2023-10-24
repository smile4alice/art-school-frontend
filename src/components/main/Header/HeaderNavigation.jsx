import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';

import styles from './Header.module.scss';

import { aboutUs, departmemts } from './dropDownItems';
import DropDownMenu from './DropDown/DropDownMenu';
import { useEffect, useState } from 'react';

const HeaderNavigation = () => {
  const items = [
    { name: 'Наші події', to: '/events' },
    { name: 'Афіша', to: '/poster' },
    { name: 'Галерея', to: '/gallery' },
    { name: 'Співпраця', to: '/cooperation' },
    { name: 'Контакти', to: '/contacts' },
  ];

  const [showDepartment, setShowDepartment] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleClickDepartment = () => {
    setShowDepartment(!showDepartment);
    setShowAboutUs(false);
  };
  const handleClickAboutUs = () => {
    setShowDepartment(false);
    setShowAboutUs(!showAboutUs);
  };

  useEffect(() => {
    const func = e => {
      const target = e.target.getAttribute('data-element-id');
      if (target !== 'dropdown') {
        setShowDepartment(false);
        setShowAboutUs(false);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('click', func);
      return () => {
        window.removeEventListener('click', func);
      };
    }
  }, []);
  return (
    <div className={styles.headerNavigationWrapper}>
      <Logo />
      <nav className={styles.nav}>
        <div className={styles.navSelectMenu}>
          <DropDownMenu
            type="Відділення"
            items={departmemts}
            open={showDepartment}
            handleClick={handleClickDepartment}
          />
          <DropDownMenu
            type="Про нас"
            items={aboutUs}
            open={showAboutUs}
            handleClick={handleClickAboutUs}
          />
        </div>
        <ul className={styles.navList}>
          {items.map(({ name, to }) => (
            <li key={name}>
              <Link key={name} to={to}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default HeaderNavigation;
