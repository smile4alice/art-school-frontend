import NavLinkButton from "@/components/ui/Buttons/NavLinkButton";
import Department from "./Department/Department";
import Container from '@/components/Container/Container'

import musicImg from "/departments/music.png";
import artImg from "/departments/art.png";
import choreografyImg from "/departments/horeografy.png";
import theaterImg from "/departments/theater.png";
import vocalImg from "/departments/vocal.png";

import styles from "./Departments.module.scss";


const Departments = () => {
  const link="http:\\example.com";
  const buttonTitle="завантажити заяву";
  const musicDepartment = "Музичне відділення";
  const artDepartment = "Образотворче відділення";
  const choreografyDepartment = "Хореографічне відділення";
  const theaterDepartment = "Театральне відділення";
  const vocalDepartment = "Вокально-хорове відділення";

  return (
   <Container>
     <div className={styles.wrapper}>
      <h1 className={styles.title}>Відділення</h1>
      <div className={styles.button}>
        <NavLinkButton title={buttonTitle} link={link} />
      </div>
      <div className={styles.departmentsContainer}>
        <Department title={musicDepartment} link={link} img={musicImg} />
        <Department title={vocalDepartment} link={link} img={vocalImg} />
        <Department title={choreografyDepartment} link={link} img={choreografyImg} />
        <Department title={artDepartment} link={link} img={artImg} />
        <Department title={theaterDepartment} link={link} img={theaterImg} />
      </div>
    </div>
   </Container>
  )
}

export default Departments