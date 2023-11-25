import Department from './Department/Department';
import Container from '@/components/Container/Container';

import musicImg from '/departments/music.png';
import artImg from '/departments/art.png';
import choreografyImg from '/departments/horeografy.png';
import theaterImg from '/departments/theater.png';
import vocalImg from '/departments/vocal.png';

import styles from './Departments.module.scss';

const Departments = () => {
  const link = 'https://example.com';
  const musicDepartment = 'Музичне відділення';
  const artDepartment = 'Образотворче відділення';
  const choreografyDepartment = 'Хореографічне відділення';
  const theaterDepartment = 'Театральне відділення';
  const vocalDepartment = 'Вокально-хорове відділення';
  const preschoolPreparatoryDepartment = 'Дошкільне та підготовче відділення';

  const downloadFile = async () => {};

  return (
    <Container>
      <div id="departmens" className={styles.wrapper}>
        <p className={`${styles.title} sectionTitle`}>Відділення</p>
        <div className={styles.buttonContainer}>
          <button onClick={downloadFile} className={styles.buttonStyle}>
            завантажити заяву
          </button>
        </div>
        <div className={styles.departmentsContainer}>
          <Department title={musicDepartment} link={link} img={musicImg} />
          <Department title={vocalDepartment} link={link} img={vocalImg} />
          <Department title={choreografyDepartment} link={link} img={choreografyImg} />
          <Department title={artDepartment} link={link} img={artImg} />
          <Department title={theaterDepartment} link={link} img={theaterImg} />
          <Department title={preschoolPreparatoryDepartment} link={link} img={theaterImg} />
        </div>
      </div>
    </Container>
  );
};

export default Departments;
