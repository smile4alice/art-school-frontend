import styles from '../main/Header/SosialList/SocialList.module.scss';

const FacebookIcon = () => {
  return (
    <svg
      className={styles.socialLinkFacebookIcon}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.434082"
        y="0.43396"
        width="21.1321"
        height="21.1321"
        rx="5"
        fill="#FFFCFC"
      />
      <path
        d="M13.5009 11.6717L13.7994 9.7267H11.9331V8.46454C11.9331 7.93243 12.1938 7.41375 13.0297 7.41375H13.8781V5.7578C13.8781 5.7578 13.1082 5.6264 12.372 5.6264C10.8351 5.6264 9.83049 6.55797 9.83049 8.24435V9.7267H8.12207V11.6717H9.83049V16.3736H11.9331V11.6717H13.5009Z"
        fill="#120000"
      />
    </svg>
  );
};

export default FacebookIcon;
