import { Link } from 'react-router-dom';
import styles from './Page404.module.scss';

const Page404 = () => {
  return (
    <div className={styles.NotFound}>
      <div className={styles.wrapper}>
        <div className="image">
          <img src="/icons/404.svg" alt="page 404" />
        </div>
        <p>
          Ой, тут має бути шедевр, але здається, ми його забули на виставці!
          <br />
          Повертайтесь на головну сторінку та вибирайте з нашої мистецької
          скарбниці.
        </p>
        <Link to={'/'}>
          <button className={styles.button}>Повернутися на головну</button>
        </Link>
      </div>
    </div>
  );
};

export default Page404;
