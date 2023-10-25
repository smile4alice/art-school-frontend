
import FacebookIcon from '@/components/Icons/FacebookIcon';
import YoutubeIcon from '@/components/Icons/YoutubeIcon';
import styles from './SocialList.module.scss';
const SocialList = () => {
  return (
   
    <div>
    <ul className={styles.social}>
      <li>
        <a className={styles.socialLink} href="#">
          <FacebookIcon />
        </a>
      </li>
      <li>
        <a className={styles.socialLink} href="#">
          <YoutubeIcon />
        </a>
      </li>
    </ul>
  </div>
  )
}

export default SocialList
