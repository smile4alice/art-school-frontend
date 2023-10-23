import { useEffect, useState } from 'react';
import { clsx } from 'clsx';

import LocationIcon from '@/components/Icons/LocationIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import EmailIcon from '@/components/Icons/EmailIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';

import styles from './Header.module.scss';

const HeaderContacts = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  }, [lastScrollY]);
  return (
    <div className={clsx(styles.contactsWrapper, show ? '' : styles.hidden)}>
      <ul className={styles.contactsList}>
        <li className={styles.contactsListItem}>
          <a
            href="https://www.google.com.ua/maps/place/Kiev+Art+School/@50.4685751,30.3658169,12z/data=!4m10!1m2!2m1!1z0YXRg9C00L7QttC90Y8g0YjQutC-0LTQsCDQstC10YDQvdC40LrRltCy0YHRjNC60L7Qs9C-!3m6!1s0x40d4ce5df69f9943:0x18b52a2948c8f340!8m2!3d50.4543277!4d30.5043019!15sCjTRhdGD0LTQvtC20L3RjyDRiNC60L7Qu9CwINCy0LXRgNC40LrRltCy0YHRjNC60L7Qs9C-kgEKYXJ0X3NjaG9vbOABAA!16s%2Fg%2F121jyvxp?entry=ttuпше "
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <LocationIcon />{' '}
            {windowWidth > 768 ? 'вул. Бульварно-Кудрявська, 2.' : ''}
          </a>
        </li>
        <li className={styles.contactsListItem}>
          <div className={styles.contactsListItem_PhoneWrapper}>
            <a href="tel:+380972907940">
              <PhoneIcon />
              {windowWidth > 768 ? '+38(097)290-79-40' : ''}
            </a>

            <a href="tel:+380934560838">
              {windowWidth > 768 ? ' +38(093)456 08 38' : ''}
            </a>
          </div>
        </li>
        <li className={styles.contactsListItem}>
          <a href="mailto:Shkola_2@ukr.net">
            <EmailIcon /> {windowWidth > 768 ? 'Shkola_2@ukr.net' : ''}
          </a>
        </li>
      </ul>

      <div>
        <ul className={styles.social}>
          <li>
            <a className={styles.socialLink} href="#">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a className={styles.socialLink} href="#">
              <YoutubeIcon width="24" height="24" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HeaderContacts;
