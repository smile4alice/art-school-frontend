import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
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

const footerLinksColumn = [
  { title: 'Головна', path: '/' },
  { title: 'Наша школа', path: '/about-school' },
  { title: 'Заходи', path: '/events' },
  { title: 'Афіша', path: '/posters' },
  { title: 'Галерея', path: '/gallery' },
  { title: 'Співпраця', path: '/cooperation' },
];
const footerLinksColumnDepartment = [
  { title: 'Музичне відділення', path: '/music-department' },
  { title: 'Вокально-хорове відділення', path: '/vocal-department' },
  { title: 'Хореографічне відділення', path: '/choreographic-department' },
  { title: 'Образотворче відділення', path: '/fine-arts-department' },
  { title: 'Театральне відділення', path: '/theater-department' },
  {
    title: 'Дошкільне та підготовче відділення',
    path: '/preschool-department',
  },
];

const Footer = ({ contacts }) => {
  const [application, setApplication] = useState([]);
  const { getDocuments, getApplication } = useDocumentsStore();

  const handleClick = path => {
    const currentPath = window.location.pathname;
    if (currentPath === path) {
      window.scrollTo(0, 0);
    }
  };

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getApplication();
        setApplication(result[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getApplication]);

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
                  application?.doc_path
                    ? application?.doc_path
                    : '/documents/заява_на_вступ.pdf'
                }
                title="Завантажити заяву"
              />
            </div>
          </div>
          <div className={styles.footerLinksSectionWrap}>
            <div className={styles.footerLinksSection}>
              <div className={styles.footerLinksColumn}>
                {footerLinksColumn.map((item, i) => (
                  <Link
                    onClick={() => {
                      handleClick(item.path);
                    }}
                    key={i}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className={styles.footerLinksColumnDepartment}>
                {footerLinksColumnDepartment.map((item, i) => (
                  <Link
                    onClick={() => {
                      handleClick(item.path);
                    }}
                    key={i}
                    to={item.path}
                  >
                    {item.title}
                  </Link>
                ))}
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
                    Пн-Пт 9:00-18:00
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
                    application?.doc_path
                      ? application?.doc_path
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
            Розробка&nbsp;
            <a
              href="https://baza-trainee.tech/"
              rel="noreferrer"
              target="_blank"
            >
              Baza Trainee Ukraine
            </a>
            &nbsp;2024&nbsp;
            <span> ©  Всі права захищені</span>
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
