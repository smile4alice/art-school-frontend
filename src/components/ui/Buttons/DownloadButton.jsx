import styles from './NavLinkButton.module.scss';

function DownloadButton({ title, link }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={styles.NavLinkButton}
    >
      {title}
    </a>
  );
}

export default DownloadButton;
