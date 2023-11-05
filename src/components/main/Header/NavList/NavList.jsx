import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import {
  navItems,
  aboutUs,
  departmemts,
} from '@/constants/headerdata';
import DropDownMenu from '../DropDown/DropDownMenu';

import styles from './NavList.module.scss';

const NavList = () => {
  const [showDepartment, setShowDepartment] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);

  const handleClickDepartment = showDepartment => {
    setShowDepartment(!showDepartment);
    setShowAboutUs(false);
  };
  const handleClickAboutUs = showAboutUs => {
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
    <nav className={styles.nav}>
      <div className={styles.navSelectMenu}>
        <DropDownMenu
          aria-label="departmemts menu"
          type="Відділення"
          items={departmemts}
          open={showDepartment}
          handleClick={handleClickDepartment}
        />
        <DropDownMenu
          aria-label="about us menu"
          type="Наша Школа"
          items={aboutUs}
          open={showAboutUs}
          handleClick={handleClickAboutUs}
        />
      </div>

      <ul className={styles.navList}>
        {navItems.map(({ name, to }) => (
          <li className={styles.navList_item} key={name}>
            <Link className={styles.navList_link} key={name} to={to}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
