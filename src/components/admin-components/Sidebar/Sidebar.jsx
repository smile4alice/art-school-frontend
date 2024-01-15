import SideBarMenuList from '../Sidebar/SideBarMenuList/SideBarMenuList';
import LogoAdmin from './LogoAdmin/LogoAdmin';
import LogoutButton from '../Buttons/LogoutButton/LogoutButton';
import styles from "./Sidebar.module.scss";

const Sidebar = () => {
   return (
      <div className={styles.sidebarWrapper}>            
         <div className={styles.sidebarContent}>
            <LogoAdmin/>
            <div className={styles.sidebar}>
            <SideBarMenuList />
            </div>
            <LogoutButton/>
         </div>
         <div className={styles.copyright}>                    
            © Розробка{' '}
            <a
              href="https://baza-trainee.tech/"
              rel="noreferrer"
              target="_blank"
            >
              Baza Trainee Ukraine,{' '}
            </a>
            2023    
         </div>       
      </div>
   )
};

export default Sidebar;