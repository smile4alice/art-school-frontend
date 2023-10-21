import { useState } from 'react';
import { clsx } from 'clsx';
import styles from './SelectDepertmemts.module.scss';
import { Link } from 'react-router-dom';
//<div className={`{styles.menu} ${open ? 'open' : ''}`}>
const DropDownMenu = ({ type, items }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.link}>
      <span onClick={handleClick}>{type}</span>

      <div className={clsx(styles.menu, open ? styles.open : '')}>
        <ul className={styles.navList}>
          {items.map(({ name, to }) => (
            <Link key={name} to={to}>
              {name}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
