import { Link } from 'react-router-dom';
import styles from './NavLinkButton.module.scss';

const NavLinkButton = ({ text, href }) => {
  return <Link  to={href}><button className={styles.NavLinkButton}>{text}</button></Link>;
};

export default NavLinkButton;
