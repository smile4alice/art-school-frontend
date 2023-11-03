import { Link } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import LocationIcon from '@/components/Icons/LocationIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import EmailIcon from '@/components/Icons/EmailIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import DownloadButton from '@/components/ui/Buttons/DownloadButton';
import styles from './Footer.module.scss';
import ClockIcon from '@/components/Icons/ClockIcon';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerWrap}>
        <div className={styles.footerContentWrap}>
          <div className={styles.footerContent}>
            <div className={styles.footerLogo}>
              <Logo />
            </div>
            <ul className={styles.social}>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://www.facebook.com/KyivArtsSchool/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon width="32" height="32" />
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href="https://www.youtube.com/c/ArtSchoolVerykivskogo"
                  target="_blank"
                  rel="noreferrer"
                >
                  <YoutubeIcon width="40" height="32" />
                </a>
              </li>
            </ul>
            <div className={styles.footerLinksRules}>
              <a href="#" target="_blank">
                Офіційна інформація
              </a>
              <a href="#" target="_blank">
                Політика конфіденційності
              </a>
              <a href="#" target="_blank">
                Правила користування сайтом
              </a>
            </div>
          </div>
          <div className={styles.footerLinksSection}>
            <div className={styles.footerLinksColumn}>
              <Link to="/">Головна</Link>
              <Link to="/about">Про нас</Link>
              <Link to="/events">Наші події</Link>
              <Link to="/schedule">Афіша</Link>
              <Link to="/gallery">Галерея</Link>
              <Link to="/partners">Співпраця</Link>
            </div>
            <div className={styles.footerLinksColumn}>
              <Link to="/music-department">Музичне відділення</Link>
              <Link to="/vocal-choral-department">
                Вокально-хорове відділення
              </Link>
              <Link to="/choreographic-department">
                Хореографічне відділення
              </Link>
              <Link to="/visual-arts-department">Образотворче відділення</Link>
              <Link to="/theater-department">Театральне відділення</Link>
            </div>
            <div className={styles.contactsListButton}>
              <ul className={styles.contactsList}>
                <li className={styles.contactsListItem}>
                  <LocationIcon />
                  <a
                    href="https://www.google.com.ua/maps/place/Kiev+Art+School/@50.4685751,30.3658169,12z/data=!4m10!1m2!2m1!1z0YXRg9C00L7QttC90Y8g0YjQutC-0LTQsCDQstC10YDQvdC40LrRltCy0YHRjNC60L7Qs9C-"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    вул. Бульварно-Кудрявська, 2.
                  </a>
                </li>
                <li className={styles.contactsListItem}>
                  <ClockIcon />
                  <div className={styles.contactsListItem_PhoneWrapper}>
                    <span>Пн-Пт 10:00-17:00</span>
                  </div>
                </li>
                <li className={styles.contactsListItem}>
                  <PhoneIcon />
                  <div className={styles.contactsListItem_PhoneWrapper}>
                    <a href="tel:+380972907940">044 272 00 30</a>
                  </div>
                </li>
                <li className={styles.contactsListItem}>
                  <EmailIcon />
                  <a href="mailto:Shkola_2@ukr.net">Shkola_2@ukr.net</a>
                </li>
              </ul>
              <DownloadButton link="#" text="Завантажити заяву" />
            </div>
          </div>
        </div>
        <div className={styles.footerSecurity}>
          © Розробка{' '}
          <a href="https://baza-trainee.tech/" rel="noreferrer" target="_blank">
            Baza Trainee Ukraine,{' '}
          </a>
          2023
        </div>
      </div>
    </div>
  );
};
export default Footer;
