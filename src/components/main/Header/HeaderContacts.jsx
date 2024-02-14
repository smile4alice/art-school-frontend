import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import LocationIcon from '@/components/Icons/LocationIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import EmailIcon from '@/components/Icons/EmailIcon';
import SocialList from './SosialList/SocialList';

import styles from './Header.module.scss';

const HeaderContacts = ({ contacts, setShow, show }) => {
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          setShow(false); //  scroll down  hide header contacts l
        } else {
          setShow(true); // srroll up,  show header contacts again
        }
        setLastScrollY(window.scrollY); // scroll number
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY,setShow]);
  return (
    <div className={clsx(styles.contactsWrapper, show ? '' : styles.hidden)}>
      <ul className={styles.contactsList}>
        <li className={styles.contactsListItem}>
          <a
            className={styles.contactsListLink}
            href={contacts.map_url}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <LocationIcon />
            {contacts && contacts.address}
          </a>
        </li>
        <li className={styles.contactsListItem}>
          <PhoneIcon />

          <div className={styles.contactsListItem_PhoneWrapper}>
            <a
              className={styles.contactsListLink}
              href={`tel:${contacts.phone}`}
            >
              {contacts && contacts.phone}
            </a>
          </div>
        </li>
        <li className={styles.contactsListItem}>
          <a
            className={styles.contactsListLink}
            href={`mailto:${contacts.email}`}
          >
            <EmailIcon /> {contacts && contacts.email}
          </a>
        </li>
      </ul>
      <SocialList
        type="headerIcon"
        facebook={contacts.facebook_url}
        youtube={contacts.youtube_url}
      />
    </div>
  );
};

export default HeaderContacts;
