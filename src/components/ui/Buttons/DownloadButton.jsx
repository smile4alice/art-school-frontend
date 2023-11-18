import styles from './NavLinkButton.module.scss';

function DownloadButton({ title }) {
  return <button className={styles.NavLinkButton}>{title}</button>;
}

export default DownloadButton;
