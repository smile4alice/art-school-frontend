import { useEffect } from 'react';
import styles from './Cooperation.module.scss';

const Cooperation = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <div className={styles.Cooperation}>
      <div className={styles.wrapper}>
        <p>
          Уявіть, що ваш захід проводиться в одній із найкрасивіших концертних
          зал у самому серці столиці! Як по завершенню концерту чи після
          перегляду виставки щаслива публіка йде прогулятися історичним центром
          міста - Пейзажною алеєю, Андріївським узвозом, Київським дитинцем.
          Уявили? З нами це можливо! КДШМ #2 ім. М. І. Вериківського гостинно
          запрошує скористатися концертною й виставковою залами закладу, де у
          вас буде технічна можливість втілити будь-яку сучасну ідею! До ваших
          послуг і шкільна студія звукозапису!
        </p>
        <div className={styles.container}>
          <h2>Концертна зала</h2>
          <div className={styles.images}>
            <img src="/cooperation/concert1.png" alt="" />
            <img src="/cooperation/concert2.png" alt="" />
          </div>
        </div>
        <div className={styles.container}>
          <h2>Студія звукозапису</h2>
          <div className={styles.images}>
            <img src="/cooperation/studio1.png" alt="" />
            <img src="/cooperation/studio2.png" alt="" />
          </div>
        </div>
        <div className={styles.container}>
          <h2>Виставкова зала</h2>
          <div className={styles.images}>
            <img src="/cooperation/expo1.png" alt="" />
            <img src="/cooperation/expo2.png" alt="" />
          </div>
        </div>
        <div className={styles.container}>
          <h2>За детальною інформацією звертайтесь:</h2>
          <ul className={styles.contacts}>
            <li>вул. Бульварно-Кудрявська, 2.</li>
            <li>
              <a href="tel:+380442720030">044 272 00 30</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cooperation;
