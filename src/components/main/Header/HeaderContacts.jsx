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
          <a href="#"> вул. Бульварно-Кудрявська, 2.</a>
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
