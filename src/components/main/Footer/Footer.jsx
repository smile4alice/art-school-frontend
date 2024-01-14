import { Link } from 'react-router-dom';
import Logo from '@/components/Logo/Logo';
import LocationIcon from '@/components/Icons/LocationIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import EmailIcon from '@/components/Icons/EmailIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import DownloadButton from '@/components/ui/Buttons/NavLinkButton';
import styles from './Footer.module.scss';
import ClockIcon from '@/components/Icons/ClockIcon';

const Footer = ({ contacts }) => {
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
                  href={contacts.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon width="32" height="32" />
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href={contacts.youtube}
                  target="_blank"
                  rel="noreferrer"
                >
                  <YoutubeIcon width="40" height="32" />
                </a>
              </li>
            </ul>

            <div className={styles.footerButton}>
              <Link to="/statement">
                <DownloadButton link="#" text="Завантажити заяву" />
              </Link>
            </div>
          </div>
          <div className={styles.footerLinksSectionWrap}>
            <div className={styles.footerLinksSection}>
              <div className={styles.footerLinksColumn}>
                <Link to="/">Головна</Link>
                <Link to="/about_school">Наша школа</Link>
                <Link to="/news">Наші події</Link>
                <Link to="/posters">Афіша</Link>
                <Link to="/gallery">Галерея</Link>
                <Link to="/cooperation">Співпраця</Link>
              </div>
              <div className={styles.footerLinksColumnDepartment}>
                <Link to="/music_department">Музичне відділення</Link>
                <Link to="/vocal_department">Вокально-хорове відділення</Link>
                <Link to="/choreographic_department">
                  Хореографічне відділення
                </Link>
                <Link to="/fine_arts_department">Образотворче відділення</Link>
                <Link to="/theater_department">Театральне відділення</Link>
                <Link to="/preschool_department">
                  Дошкільне та підготовче відділення
                </Link>
              </div>
            </div>
            <div className={styles.contactsListWrap}>
              <ul className={styles.contactsList}>
                <li className={styles.contactsListItem}>
                  <LocationIcon />
                  <a
                    href={contacts.map}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    {contacts.address}
                  </a>
                </li>
                <li className={styles.contactsListItem}>
                  <ClockIcon />
                  <div className={styles.contactsListItem_PhoneWrapper}>
                    Пн-Пт 10:00-17:00
                  </div>
                </li>
                <li className={styles.contactsListItem}>
                  <PhoneIcon />
                  <div className={styles.contactsListItem_PhoneWrapper}>
                    <a href={`tel:${contacts.phone}`}>{contacts.phone}</a>
                  </div>
                </li>
                <li className={styles.contactsListItem}>
                  <EmailIcon />
                  <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
                </li>
              </ul>
              <div className={styles.footerButtonAdaptive}>
                <DownloadButton link="#" text="Завантажити заяву" />
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.socialAdaptive}>
          <li>
            <a
              className={styles.socialLink}
              href={contacts.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon width="32" height="32" />
            </a>
          </li>
          <li>
            <a
              className={styles.socialLink}
              href={contacts.youtube}
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeIcon width="40" height="32" />
            </a>
          </li>
        </ul>

        <div className={styles.footerLinksRulesWrap}>
          <div className={styles.footerSecurity}>
            © Розробка{' '}
            <a
              href="https://baza-trainee.tech/"
              rel="noreferrer"
              target="_blank"
            >
              Baza Trainee Ukraine,{' '}
            </a>
            2023
          </div>
          <div className={styles.footerLinksRules}>
            {/* <a href="#" target="_blank">
              Офіційна інформація
            </a> */}
            {/* <a href="#" target="_blank">
              Політика конфіденційності
            </a> */}
            {/* <a href="#" target="_blank">
              Правила користування сайтом
            </a> */}
            <Link to="/statement">Політика конфідеційності</Link>
            <Link to="/school_documents">Правила користування сайтом</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
