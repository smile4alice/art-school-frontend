import { clsx } from 'clsx';
import styles from './DropDown.module.scss';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { HashLink } from 'react-router-hash-link';
import arrowIcon from '/icons/arrow.svg';

const DropDownMenu = ({
  departmemts,
  aboutSchool,
  toggleBurgerMenu,
  isOpen,
  currentId,
  setCurrentId,
  setIsOpen,
}) => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  return (
    <>
      <HashLink
        className={clsx(styles.dropDown, !isDesktop && styles.dropDownMobile)}
        onClick={() => {
          setIsOpen(!isOpen);
          setCurrentId('departments');
        }}
        onMouseEnter={() => {
          setIsOpen(true);
          setCurrentId('departments');
        }}
        onMouseLeave={() => {
          setIsOpen(false);
          setCurrentId('');
        }}
        scroll={el => {
          if (isDesktop) {
            el.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }
        }}
      >
        <div className={styles.dropDownNameWrapper}>
          <span
            className={clsx(
              styles.dropDownName,
              isOpen && currentId === 'departments' ? styles.open : ''
            )}
          >
            {/* {type} */}
            Відділення
          </span>

          <span
            className={`${styles.icon} ${
              isOpen && currentId === 'departments' ? styles.rotateIcon : ''
            }`}
          >
            <img src={arrowIcon} alt="Arrow Icon" />
          </span>
        </div>

        {isOpen && currentId === 'departments' && (
          <ul
            className={clsx(
              styles.menu,
              isOpen && currentId === 'departments' ? styles.open : '',
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
                    !isDesktop && toggleBurgerMenu();
                  }}
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </HashLink>

      <div
        className={clsx(styles.dropDown, !isDesktop && styles.dropDownMobile)}
        onMouseEnter={() => {
          setCurrentId('about-school');
          setIsOpen(true);
        }}
        onMouseLeave={() => {
          setIsOpen(false);
          setCurrentId('');
        }}
        onClick={() => {
          setIsOpen(!isOpen);
          setCurrentId('about-school');
        }}
      >
        <div className={styles.dropDownNameWrapper}>
          <span className={clsx(styles.dropDownName, open ? styles.open : '')}>
            {/* {type} */}
            Наша школа
          </span>

          <span
            className={`${styles.icon} ${
              isOpen && currentId === 'about-school' ? styles.rotateIcon : ''
            }`}
          >
            <img src={arrowIcon} alt="Arrow Icon" />
          </span>
        </div>

        {isOpen && currentId === 'about-school' && (
          <ul
            className={clsx(
              styles.menu,
              isOpen && currentId === 'about-school' ? styles.open : '',
              styles.aboutUsMenu
            )}
          >
            <li className={styles.menuItem} key={name}>
              <Link
                className={clsx(styles.menulink, open ? styles.open : '')}
                key={name}
                to="/about-school-history"
                onClick={() => {
                  !isDesktop && toggleBurgerMenu();
                }}
              >
                Історія Школи
              </Link>
            </li>
            {aboutSchool.map(({ name, to }) => (
              <li className={styles.menuItem} key={name}>
                <HashLink
                  className={clsx(styles.menulink, open ? styles.open : '')}
                  key={name}
                  to={to}
                  onClick={() => {
                    !isDesktop && toggleBurgerMenu();
                  }}
                  scroll={el => {
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  {name}
                </HashLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DropDownMenu;
