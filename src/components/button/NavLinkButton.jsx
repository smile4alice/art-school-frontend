import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavLinkButton.module.scss';

function NavLinkButton({ link, title }) {
  return (
    <Link to={link}>
      <button className={styles.NavLinkButton}>{title}</button>
    </Link>
  );
}



export default NavLinkButton;

