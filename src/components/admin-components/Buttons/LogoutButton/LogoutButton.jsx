import { Link } from 'react-router-dom';
import sprite from '../../../../assets/icons/sprite-admin.svg';
import styles from './LogoutButton.module.scss';
import { useAuthorizated } from '@/store/IsAuthorizatedStore';

const LogoutButton = () => {
  const { setUnAuthorizated } = useAuthorizated();
  return (
    <Link
      className={styles.logoutButtonLink}
      onClick={() => setUnAuthorizated()}
    >
      <p>Вихід</p>
      <svg width="16" height="16">
        <use href={`${sprite}#logout`} className={styles.icon} />
      </svg>
    </Link>
  );
};

export default LogoutButton;
