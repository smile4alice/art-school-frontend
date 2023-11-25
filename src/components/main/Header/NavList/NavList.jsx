import { useState } from 'react';

import { Link } from 'react-router-dom';

import { aboutUs, departmemts } from '@/constants/dropDownItems.js';
import { navItems } from '@/constants/navList.js';
console.log('departmemts : ', departmemts);
import DropDownMenu from '../DropDown/DropDownMenu';

import styles from './NavList.module.scss';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';

const NavList = ({ toggleBurgerMenu }) => {
  const [showDepartment, setShowDepartment] = useState(false);

  const [showAboutUs, setShowAboutUs] = useState(false);

  const isDesktop = useMediaQuery({ minWidth: 1240 });

  const handleClickDepartment = () => {
    setShowDepartment(!showDepartment);
    setShowAboutUs(false);
  };
  const handleClickAboutSchool = () => {
    setShowDepartment(false);
    setShowAboutUs(!showAboutUs);
  };
  const handleCloseAll = () => {
    setShowDepartment(false);
    setShowAboutUs(false);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navSelectMenu}>
        <DropDownMenu
          departmemts={departmemts}
          aboutSchool={aboutUs}
          open={showDepartment}
          handleClickDepartment={handleClickDepartment}
          toggleBurgerMenu={toggleBurgerMenu}
          handleClickAboutSchool={handleClickAboutSchool}
          showDepartment={showDepartment}
          showAboutUs={showAboutUs}
          handleCloseAll={handleCloseAll}
        />
      </div>

      <ul
        className={clsx(styles.navList, !isDesktop ? styles.navListMobile : '')}
      >
        {navItems.map(({ name, to }) => (
          <li className={styles.navList_item} key={name}>
            <Link
              className={styles.navList_link}
              key={name}
              to={to}
              onClick={toggleBurgerMenu}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
