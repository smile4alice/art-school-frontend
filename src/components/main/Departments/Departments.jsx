import NavLinkButton from "@/components/ui/NavLinkButton/NavLinkButton";
import Department from "./Department/Department";
import Container from '@/components/Container/Container'

import musicImg from "/departments/music.png";
import artImg from "/departments/art.png";
import choreografyImg from "/departments/horeografy.png";
import theaterImg from "/departments/theater.png";
import vocalImg from "/departments/vocal.png";

import styles from './Departments.module.scss';

const Departments = () => {
  const link = 'hppp:\\example.com';
  const musicDepartment = 'Музичне відділення';
  const artDepartment = 'Образотворче відділення';
  const horeografyDepartment = 'Хореографічне відділення';
  const theaterDepartment = 'Театральне відділення';
  const vocalDepartment = 'Вокально-хорове відділення';

  const downloadFile = async () => {
    
  };

  return (
    <Container>
      <div className={styles.wrapper}>
        <p className={styles.title}>Відділення</p>
        <div className={styles.buttonContainer}>
          <button onClick={downloadFile} className={styles.buttonStyle}>завантажити заяву</button>
        </div>
        <div className={styles.departmentsContainer}>
          <Department title={musicDepartment} link={link} img={musicImg} />
          <Department title={vocalDepartment} link={link} img={vocalImg} />
          <Department title={horeografyDepartment} link={link} img={horeografyImg} />
          <Department title={artDepartment} link={link} img={artImg} />
          <Department title={theaterDepartment} link={link} img={theaterImg} />
        </div>
      </div>
    </Container>
  );


export default Departments;
