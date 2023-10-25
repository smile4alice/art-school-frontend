import { Link } from 'react-router-dom';
import LogoImg from '../../assets/img/Logo.png';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <Link to="/">
        <img src={LogoImg} alt="company logo" className={styles.logoImg} />
      </Link>
      <p className={styles.logoText}>
        Київська дитяча школа мистецтв №2 <br />
        <span> ім. Михайла Вериківського</span>
      </p>
    </div>
  );
};

export default Logo;
