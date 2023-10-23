import { Link } from 'react-router-dom';
import LogoIcon from '../../../Icons/LogoIcon';
import styles from './Logo.module.scss';
const Logo = () => {
  return (
    <div className={styles.logoWrapper}>
      <Link to='/' >
        <LogoIcon/>
      </Link>
      <div className={styles.logoTextWrap}>
          <p className={styles.logoText}>
            Київська дитяча школа мистецтв №2        
          </p>
          <p className={styles.logoTextTwo}>ім. Михайла Вериківського</p> 
      </div>
    </div>
  );
};

export default Logo;