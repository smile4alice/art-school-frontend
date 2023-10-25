import { Link } from 'react-router-dom';
import LogoIcon from '../Icons/LogoIcon';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
    <Link to="/" className={styles.logoWrapper}>
      <LogoIcon />
      <div className={styles.logoText}>
        <p>Київська дитяча школа мистецтв №2</p>
        <span> ім. М. I. Вериківського</span>
      </div>
    </Link>
  );
};

export default Logo;
