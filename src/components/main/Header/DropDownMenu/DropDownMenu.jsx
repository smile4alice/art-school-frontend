import { clsx } from 'clsx';
import styles from './DropDown.module.scss';
import { Link } from 'react-router-dom';
import DropDownIcon from '../../../../assets/icons/DropDownIcon';
//<div className={`{styles.menu} ${open ? 'open' : ''}`}>
const DropDownMenu = ({ type, items, handleClick, open }) => {
  return (
    <div className={styles.dropDown} onClick={handleClick}>
      <span>{type}</span>
      <DropDownIcon />

      <ul
        className={clsx(
          styles.menu,
          open ? styles.open : '',
          type === 'Відділення' ? styles.departmentsMenu : styles.aboutUsMenu
        )}
      >
        {items.map(({ name, to }) => (
          <li className={styles.menuItem} key={name}>
            <Link className={styles.menulink} key={name} to={to}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropDownMenu;
