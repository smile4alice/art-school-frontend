import Container from '@/components/Container/Container';
import {
  theaterDepartmentInfo,
  theaterDepartmentAchivments,
} from '@/constants/theaterDepartmentInfo';

import styles from './Theater.module.scss';

import AchievementsSlider from '@/components/Slider/achievementsSlider/achievementsSlider';

const Theater = () => {
  return (
    <section>
      <Container>
        <div className={styles.contentWrapper}>
          <ul>
            {theaterDepartmentInfo.map(item => (
              <li key={item.id}>
                <div>
                  <img src={item.url} alt="" />
                  <p> {item.description}</p>
                </div>
              </li>
            ))}
          </ul>

          
            <AchievementsSlider data={theaterDepartmentAchivments} />
          
        </div>
      </Container>
    </section>
  );
};

export default Theater;
