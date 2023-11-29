import React from "react";
import { Link, useLocation } from "react-router-dom";
import sprite from '../../../../assets/icons/sprite-admin.svg';
import styles from './SideBarMenuItem.module.scss';

const SideBarMenuItem = ({ title, link, iconClass, isFilled }) => {
   const location = useLocation();

   console.log("location.pathname:", location.pathname);
   console.log("link:", link);
   console.log("isActive:", location.pathname === link);

   return (
      <Link
         to={link}
         className={`${styles.sidebarMenuItem} ${location.pathname === link ? styles.active : ''}`}
      >
         {iconClass && (
            <span
               className={`${styles.icon} icon ${ 
                  location.pathname === link ? styles.activeIcon : styles.hoverIcon
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

export default SideBarMenuItem;


