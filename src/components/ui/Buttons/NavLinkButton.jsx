import { Link } from 'react-router-dom';
import styles from './NavLinkButton.module.scss';

const NavLinkButton = ({ text, href }) => {
  console.log(href);
  return (
    <Link to={href} className={styles.NavLinkButton}>
      {text}
    </Link>
  );
};

export default NavLinkButton;
