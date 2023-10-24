import { Link } from 'react-router-dom';
import LogoImg from '../../assets/img/Logo.png';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
      <Link to="/" className={styles.logoWrapper}>
        <img src={LogoImg} alt="logo" />
        <p className={styles.logoText}>
          Київська дитяча школа мистецтв №2 ім. Михайла Вериківського
        </p>
      </Link>
  );
};

export default Logo;
