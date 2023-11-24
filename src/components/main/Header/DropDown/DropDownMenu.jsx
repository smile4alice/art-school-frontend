import { clsx } from 'clsx';
import styles from './DropDown.module.scss';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HashLink } from 'react-router-hash-link';

const DropDownMenu = ({
  showDepartment,
  departmemts,
  aboutSchool,
  showAboutUs,
  toggleBurgerMenu,
  handleClickDepartment,
  handleClickAboutSchool,
  handleCloseAll,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 1240 });

  return (
    <>
      <HashLink
        className={clsx(styles.dropDown, !isDesktop && styles.dropDownMobile)}
        onClick={handleClickDepartment}
        onMouseEnter={handleClickDepartment}
        onMouseLeave={handleCloseAll}
        scroll={el => {
          if (isDesktop) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
            });
          }
        }}
        to="/#departmens"
      >
        <div className={styles.dropDownNameWrapper}>
          <span className={clsx(styles.dropDownName, open ? styles.open : '')}>
            {/* {type} */}
            Відділення
          </span>

          {!showDepartment ? (
            <span className={styles.dropDown_iconDown}></span>
          ) : (
            <span className={styles.dropDown_iconUp}></span>
          )}
        </div>

        {showDepartment && (
          <ul
            className={clsx(
              styles.menu,
              open ? styles.open : '',
              styles.departmentsMenu
            )}
          >
            {departmemts.map(({ name, to }) => (
              <li className={styles.menuItem} key={name}>
                <Link
                  className={clsx(styles.menulink, open ? styles.open : '')}
                  key={name}
                  to={to}
                  onClick={() => {
                    toggleBurgerMenu();
                  }}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </HashLink>

      <Link
        className={clsx(styles.dropDown, !isDesktop && styles.dropDownMobile)}
        to="/aboutSchool"
        onClick={handleClickAboutSchool}
        onMouseEnter={handleClickAboutSchool}
        onMouseLeave={handleCloseAll}
      >
        <div className={styles.dropDownNameWrapper}>
          <span className={clsx(styles.dropDownName, open ? styles.open : '')}>
            {/* {type} */}
            Про школу
          </span>

          {!showAboutUs ? (
            <span className={styles.dropDown_iconDown}></span>
          ) : (
            <span className={styles.dropDown_iconUp}></span>
          )}
        </div>

        {showAboutUs && (
          <ul
            className={clsx(
              styles.menu,
              open ? styles.open : '',

              styles.aboutUsMenu
            )}
          >
            {aboutSchool.map(({ name, to }) => (
              <li className={styles.menuItem} key={name}>
                <Link
                  className={clsx(styles.menulink, open ? styles.open : '')}
                  key={name}
                  to={to}
                  onClick={() => {
                    toggleBurgerMenu();
                  }}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Link>
    </>
  );
};

export default DropDownMenu;
