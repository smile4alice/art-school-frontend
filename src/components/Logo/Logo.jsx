import LogoImg from '../../assets/img/Logo.png';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <a href="#">
        <img src={LogoImg} alt="" />
      </a>
      <p className={styles.logoText}>
        Київська дитяча школа мистецтв №2 ім. Михайла Вериківського
      </p>
    </div>
  );
};

export default Logo;
