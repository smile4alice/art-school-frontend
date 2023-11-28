import { Link } from 'react-router-dom';
import sprite from '../../../../assets/icons/sprite-admin.svg';
import styles from './LogoutButton.module.scss'

const LogoutButton = () => {

  return (
   <Link className={styles.logoutButtonLink}>
      <p>Вихід</p>
      <svg width="16" height="16">
         <use href={`${sprite}#logout`} className={styles.icon} />
      </svg>
   </Link>

  );
};

export default LogoutButton;