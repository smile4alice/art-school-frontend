import styles from './NavLinkButton.module.scss';

const NavLinkButton = ({ text }) => {
  return <button className={styles.NavLinkButton}>{text}</button>;
};

export default NavLinkButton;
