import { Link } from 'react-router-dom';
import styles from './NavLinkButton.module.scss';

function NavLinkButton({ link, title }) {
  return (
    <Link to={link} className={styles.NavLinkButton}>
      {title}
    </Link>
  );
}

export default NavLinkButton;
