import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styles from "./AdminSharedLayout.module.scss";

const AdminSharedLayout = () => {
   return (
      <div className={styles.mainWrapper}>            
         <main className="adminBackdrop">
            <Suspense fallback={<div>Loading...</div>}>
               <Outlet />
            </Suspense>
         </main>
      </div>
   )
};

export default AdminSharedLayout;