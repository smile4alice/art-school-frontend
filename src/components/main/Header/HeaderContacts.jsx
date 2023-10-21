import EmailIcon from '@/assets/icons/EmailIcon';
import LocationIcon from '@/assets/icons/LocationIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';

import FacebookIcon from '../../../assets/icons/FacebookIcon';
import YoutubeIcon from '../../../assets/icons/YouTubeIcon';

import styles from './Header.module.scss';

const HeaderContacts = () => {
  return (
    <div className={styles.contactsWrapper}>
      <ul className={styles.contactsList}>
        <li className={styles.contactsListItem}>
          <LocationIcon />
          <a
            href="https://www.google.com.ua/maps/place/Kiev+Art+School/@50.4685751,30.3658169,12z/data=!4m10!1m2!2m1!1z0YXRg9C00L7QttC90Y8g0YjQutC-0LTQsCDQstC10YDQvdC40LrRltCy0YHRjNC60L7Qs9C-!3m6!1s0x40d4ce5df69f9943:0x18b52a2948c8f340!8m2!3d50.4543277!4d30.5043019!15sCjTRhdGD0LTQvtC20L3RjyDRiNC60L7Qu9CwINCy0LXRgNC40LrRltCy0YHRjNC60L7Qs9C-kgEKYXJ0X3NjaG9vbOABAA!16s%2Fg%2F121jyvxp?entry=ttuпше "
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            вул. Бульварно-Кудрявська, 2.
          </a>
        </li>
        <li className={styles.contactsListItem}>
          <PhoneIcon />
          <div className={styles.contactsListItem_PhoneWrapper}>
            <a href="tel:+380972907940">+38(097)290-79-40</a>

            <a href="tel:+380934560838">+38(093)456 08 38</a>
          </div>
        </li>
        <li className={styles.contactsListItem}>
          <EmailIcon />
          <a href="mailto:info@gmail.com"> info@gmail.com</a>
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
