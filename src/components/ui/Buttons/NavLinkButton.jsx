import styles from './NavLinkButton.module.scss';

function NavLinkButton({ title }) {
  return <button className={styles.NavLinkButton}>{title}</button>;
}

export default NavLinkButton;
