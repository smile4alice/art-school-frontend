import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from '../Sidebar/Sidebar';
import styles from "./AdminSharedLayout.module.scss";

const AdminSharedLayout = () => {
   return (
      <main className={styles.mainWrapper}>            
         <div className={styles.adminBackdrop}>
            <Sidebar />
            <Suspense fallback={<div>Loading...</div>}>
               <Outlet />
            </Suspense>
         </div>
      </main>
   )
};

export default AdminSharedLayout;