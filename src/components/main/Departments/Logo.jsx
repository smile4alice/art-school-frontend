import { Link } from 'react-router-dom';
import LogoIcon from '../Icons/LogoIcon';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
    <Link to="/" className={styles.logoWrapper}>
      <LogoIcon />
      <p className={styles.logoText}>
        Київська дитяча школа мистецтв №2 <br />
        <span> ім. Михайла Вериківського</span>
      </p>
    </Link>
  );
};

export default Logo;
