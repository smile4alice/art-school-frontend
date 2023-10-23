import React from 'react';
import styles from './NavLinkButton.module.scss';

const DownloadButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" className={styles.NavLinkButton}>
      {text}
    </a>
  );
};

export default DownloadButton;
