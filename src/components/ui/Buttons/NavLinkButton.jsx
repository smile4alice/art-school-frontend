import React from 'react';
import styles from './NavLinkButton.module.scss';

const NavLinkButton = ({ link, text }) => {
  return (
    <a href={link} target="_blank" className={styles.NavLinkButton}>
      {text}
    </a>
  );
};

export default NavLinkButton;
