import React from "react";
import SideBarMenuItem from "../SideBarMenuItem/SideBarMenuItem";
import styles from './SideBarMenuList.module.scss';

const SideBarMenuList = () => {
   return (
      <div className={styles.sidebarMenuList}>
         <SideBarMenuItem title="Слайдери" link="sliders" isFilled={false} iconClass="icon-sliders" />
         <SideBarMenuItem title="Новини" link="news" isFilled={true} iconClass="icon-news" />
         <SideBarMenuItem title="Афіші" link="posters" isFilled={true} iconClass="icon-posters" />
         <SideBarMenuItem title="Галерея" link="gallery" isFilled={true} iconClass="icon-gallery" />
         <SideBarMenuItem title="Відділення" link="departments" isFilled={false} iconClass="icon-departments" />
         <SideBarMenuItem title="Наші досягнення" link="achievements" isFilled={true} iconClass="icon-achievements" />
         <SideBarMenuItem title="Адміністрація" link="administration" isFilled={true} iconClass="icon-administration" />
         <SideBarMenuItem title="Контакти" link="contacts" isFilled={true} iconClass="icon-contacts" />
         <SideBarMenuItem title="Зміна паролю" link="password" isFilled={true} iconClass="icon-password" />
      </div>
   );
};

export default SideBarMenuList;
