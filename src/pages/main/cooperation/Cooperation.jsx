import { Link } from 'react-router-dom';
import styles from './Cooperation.module.scss';
import Slider from '@/components/Slider/Slider';

const slides = [
  '/cooperation/coop1.png',
  '/cooperation/coop2.png',
  '/cooperation/coop1.png',
  '/cooperation/coop2.png',
];

const Cooperation = () => {
  return (
    <div className={styles.Cooperation}>
      <div className={styles.wrapper}>
        <h1>
          Надаємо можливість оренди концертної зали, студії звукозапису та
          виставкової зали
        </h1>
        <div className={styles.container}>
          <h2>Концертна зала</h2>
          <p>Оплата здійснюється погодинно</p>
          <h3>Послуги</h3>
          <ul>
            <li>обслуговування</li>
            <li>запис відеокамери</li>
            <li>світло, озвучення (електрика)</li>
            <li>лед екран</li>
            <li>монтаж відеоматеріалів</li>
            <li>трансляція (стрім)</li>
            <li>рояль</li>
            <li>лінолеум балетний</li>
            <li>станки хорові (1 малий, 1 великий)</li>
            <li>запис студійна в залі (до 15 мікрофонів)</li>
          </ul>
          <h3>Фото концертної зали</h3>
          <div className={styles.sliderbox}>
            <Slider slides={slides} />
          </div>
          <h2>Студія звукозапису</h2>
          <h3>Послуги</h3>
          <ul>
            <li>запис</li>
            <li>зведення (ціна залежить від складності)</li>
            <li>обслуговування</li>
          </ul>
          <h2>Виставкова зала</h2>
          <p>Оплата здійснюється погодинно</p>
          <h3>Фото виставкової зали</h3>
          <div className={styles.sliderbox}>
            <Slider slides={slides} />
          </div>
          <h2>За детальною інформацією звертайтесь:</h2>
          <ul className={styles.contacts}>
            <li>вул. Бульварно-Кудрявська, 2.</li>
            <li>
              <Link to="tel:+380442720030">044 272 00 30</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cooperation;
