import sprite from '@/assets/icons/sprite-admin.svg';
import styles from './LogoutButton.module.scss';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import { useNavigate } from 'react-router-dom';
import axios from '@/utils/axios';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { setUnAuthorized } = useAuthorized();

  const checkAndRemoveKey = async key => {
    const value = localStorage.getItem(key);
    const exists = value !== null;
    if (exists) {
      await axios.post('/auth/logout').then(res => {
        if (res.status > 200 && res.status < 400) {
          localStorage.removeItem(key);
          setUnAuthorized();
          navigate('/login');
        }
      });
    }
  };

  return (
    <button
      className={styles.logoutButtonLink}
      onClick={() => {
        checkAndRemoveKey('access_token');
      }}
    >
      <svg width="16" height="16">
        <use href={`${sprite}#logout`} className={styles.icon} />
      </svg>
      <p>Вихід</p>
    </button>
  );
};

export default LogoutButton;
