import { sideBarList } from './sideBarList';
import SideBarMenuItems from '../SideBarMenuItems/SideBarMenuItems';
import styles from './SideBarMenuList.module.scss';

const SideBarMenuList = () => {
  return (
    <div className={styles.sidebarMenuList}>
      {sideBarList.map((item, index) => (
        <SideBarMenuItems
          key={index}
          title={item.title}
          link={item.link}
          isFilled={item.isFilled}
          iconClass={item.iconClass}
        />
      ))}
    </div>
  );
};

export default SideBarMenuList;
