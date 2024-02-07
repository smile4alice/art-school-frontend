import styles from './NavLinkButton.module.scss';

function DownloadButton({ title, link }) {
  return (
    <button
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={styles.NavLinkButton}
    >
      {title}
    </button>
  );
}

export default DownloadButton;
