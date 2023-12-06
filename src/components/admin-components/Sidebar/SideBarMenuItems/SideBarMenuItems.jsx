import { Link, useLocation } from 'react-router-dom';
import sprite from '@/assets/icons/sprite-admin.svg';
import styles from './SideBarMenuItems.module.scss';

const SideBarMenuItems = ({ title, link, isFilled, iconClass }) => {
  const location = useLocation();
  const pathName = location.pathname.split('/').pop();

  return (
    <Link
      to={link}
      className={`${styles.sidebarMenuItem} ${
        pathName === link ? styles.active : ''
      }`}
    >
      {iconClass && (
        <span
          className={`${styles.icon} icon ${
            location.pathName === link ? styles.activeIcon : styles.hoverIcon
          } ${isFilled ? styles.filledIcon : styles.strokedIcon}`}
        >
          <svg className="icon">
            <use href={`${sprite}#${iconClass}`} width="15" height="15" />
          </svg>
        </span>
      )}
      {title}
    </Link>
  );
};

export default SideBarMenuItems;
