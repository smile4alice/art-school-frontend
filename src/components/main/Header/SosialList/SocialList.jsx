import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import styles from './SocialList.module.scss';
const SocialList = ({ type, youtube, facebook }) => {
  return (
    <div>
      <ul className={styles.social}>
        <li>
          <a
            className={styles.socialLink}
            href={facebook}
            target="_blank"
            rel="noreferrer"
          >
            <FacebookIcon type={type} />
          </a>
        </li>
        <li>
          <a
            className={styles.socialLink}
            href={youtube}
            target="_blank"
            rel="noreferrer"
          >
            <YoutubeIcon type={type} />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SocialList;
