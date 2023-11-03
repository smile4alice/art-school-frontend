import Icon404 from '@/components/Icons/Icon404';
import styles from './Page404.module.scss';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';

const Page404 = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.wrapper}>
        <Icon404 />
        <p>
          Ой, тут має бути шедевр, але здається, ми його забули на виставці!
          <br />
          Повертайтесь на головну сторінку та вибирайте із нашої мистецької
          скарбниці.
        </p>
        <NavLinkButton title={'Повернутися на головну'} link={'/'} />
      </div>
    </div>
  );
};

export default Page404;
