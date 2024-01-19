import { Link } from 'react-router-dom';
import LogoIcon from '../Icons/LogoIcon';
import styles from './Logo.module.scss';
const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      aria-label="company logo navigation to home page"
      to="/"
      className={styles.logoWrapper}
      onClick={scrollToTop}
    >
      <LogoIcon />
      <div className={styles.logoText}>
        Київська дитяча школа мистецтв №2 <br />
        <span> ім. М. I. Вериківського</span>
      </div>
    </Link>
  );
};

export default Logo;
