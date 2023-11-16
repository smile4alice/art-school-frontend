import { clsx } from 'clsx';
import styles from './DropDown.module.scss';
import { Link } from 'react-router-dom';

const DropDownMenu = ({ type, items, handleClick, open }) => {
  return (
    <div className={styles.dropDown}>
      <div
        data-element-id="dropdown"
        className={styles.dropDownNameWrapper}
        onClick={() => handleClick(true)}
      >
        <span
          className={clsx(styles.dropDownName, open ? styles.open : '')}
          data-element-id="dropdown"
        >
          {type}
        </span>
        {!open ? (
          <span
            className={styles.dropDown_iconDown}
            data-element-id="dropdown"
          ></span>
        ) : (
          <span
            className={styles.dropDown_iconUp}
            data-element-id="dropdown"
          ></span>
        )}
      </div>

      {open && (
        <ul
          className={clsx(
            styles.menu,
            open ? styles.open : '',
            type === 'Відділення' ? styles.departmentsMenu : styles.aboutUsMenu
          )}
        >
          {items.map(({ name, to }) => (
            <li className={styles.menuItem} key={name}>
              <Link
                className={clsx(styles.menulink, open ? styles.open : '')}
                key={name}
                to={to}
              
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownMenu;
