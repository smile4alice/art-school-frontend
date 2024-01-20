import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';

import Logo from '@/components/Logo/Logo';
import LocationIcon from '@/components/Icons/LocationIcon';
import PhoneIcon from '@/components/Icons/PhoneIcon';
import EmailIcon from '@/components/Icons/EmailIcon';
import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import DownloadButton from '@/components/ui/Buttons/DownloadButton';
import styles from './Footer.module.scss';
import ClockIcon from '@/components/Icons/ClockIcon';

const Footer = ({ contacts }) => {
  const { getDocuments } = useDocumentsStore();
  const documents = useDocumentsStore(state => state.documents);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDocuments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDocuments]);

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
                  href={contacts.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon width="32" height="32" />
                </a>
              </li>
              <li>
                <a
                  className={styles.socialLink}
                  href={contacts.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <YoutubeIcon width="40" height="32" />
                </a>
              </li>
            </ul>

            <div className={styles.footerButton}>
              <DownloadButton
                link={
                  documents[0]?.doc_path
                    ? documents[0]?.doc_path
                    : '/documents/заява_на_вступ.pdf'
                }
                title="Завантажити заяву"
              />
            </div>
          </div>
          <div className={styles.footerLinksSectionWrap}>
            <div className={styles.footerLinksSection}>
              <div className={styles.footerLinksColumn}>
                <Link to="/">Головна</Link>
                <Link to="/about_school">Наша школа</Link>
                <Link to="/events">Наші події</Link>
                <Link to="/posters">Афіша</Link>
                <Link to="/gallery">Галерея</Link>
                <Link to="/cooperation">Співпраця</Link>
              </div>
              <div className={styles.footerLinksColumnDepartment}>
                <Link to="/music-department">Музичне відділення</Link>
                <Link to="/vocal-department">Вокально-хорове відділення</Link>
                <Link to="/сhoreographic-department">
                  Хореографічне відділення
                </Link>
                <Link to="/fine-arts-department">Образотворче відділення</Link>
                <Link to="/theater-department">Театральне відділення</Link>
                <Link to="/preschool-department">
                  Дошкільне та підготовче відділення
                </Link>
              </div>
            </div>
            <div className={styles.contactsListWrap}>
              <ul className={styles.contactsList}>
                <li className={styles.contactsListItem}>
                  <LocationIcon />
                  <a
                    href={contacts.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
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
                <DownloadButton
                  link={
                    documents[0]?.doc_path
                      ? documents[0]?.doc_path
                      : '/documents/заява_на_вступ.pdf'
                  }
                  title="Завантажити заяву"
                />
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.socialAdaptive}>
          <li>
            <a
              className={styles.socialLink}
              href={contacts.facebook_url}
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon width="32" height="32" />
            </a>
          </li>
          <li>
            <a
              className={styles.socialLink}
              href={contacts.youtube_url}
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
            <a
              href="/documents/політика_конфіденційності.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Політика конфіденційності
            </a>
            <a
              href="/documents/правила_користування_сайтом.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Правила користування сайтом
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Footer;
