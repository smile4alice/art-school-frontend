import { Link } from 'react-router-dom';
import AdminHome from '@/components/Icons/AdminHome';
import AdminArrow from '@/components/Icons/AdminArrow';
import styles from './BreadCrumbs.module.scss';

const BreadCrumbs = ({ breadcrumbs }) => {
  const isActive = index => {
    if (index === breadcrumbs.length - 1) {
      return styles.active;
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>
        <Link to={'/admin/sliders'}>
          <AdminHome />
        </Link>
      </div>

      {breadcrumbs.map((item, index) => (
        <div
          key={index}
          // className={index === 3 ? styles.crumb_active : styles.crumb}
          className={`${styles.crumb} ${isActive(index)}`}
        >
          <AdminArrow />
          <span>{item}</span>
          <span>{index === breadcrumbs.length}</span>
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
