import styles from './Page404.module.scss';
import NavLinkButton from '@/components/ui/Buttons/DownloadButton';

const Page404 = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.wrapper}>
        <div className="image">
          <img src="/404.svg" alt="page 404" />
        </div>
        <p>
          Ой, тут має бути шедевр, але здається, ми його забули на виставці!
          <br />
          Повертайтесь на головну сторінку та вибирайте з нашої мистецької
          скарбниці.
        </p>
        <NavLinkButton title={'Повернутися на головну'} link={'/'} />
      </div>
    </div>
  );
};

export default Page404;
