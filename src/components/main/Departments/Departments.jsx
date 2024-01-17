import { useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';

import Department from './Department/Department';
import Container from '@/components/Container/Container';

import musicImg from '/departments/music.webp';
import artImg from '/departments/art.webp';
import choreografyImg from '/departments/horeografy.webp';
import theaterImg from '/departments/theater.webp';
import vocalImg from '/departments/vocal.webp';
import preschoolImg from '/departments/preschool.webp';

import styles from './Departments.module.scss';

const Departments = () => {
  const { getDocuments } = useDocumentsStore();
  const documents = useDocumentsStore(state => state.documents);

  const musicDepartment = 'Музичне відділення';
  const artDepartment = 'Образотворче відділення';
  const choreografyDepartment = 'Хореографічне відділення';
  const theaterDepartment = 'Театральне відділення';
  const vocalDepartment = 'Вокально-хорове відділення';
  const preschoolPreparatoryDepartment = 'Дошкільне та підготовче відділення';

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDocuments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDocuments]);

  return (
    <section className="section">
      <Container>
        <div id="departmens" className={styles.wrapper}>
          <p className={`${styles.title} sectionTitle`}>Відділення</p>
          <div className={styles.buttonContainer}>
            <a
              href={documents[0].doc_path}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <button className={styles.buttonStyle}>завантажити заяву</button>
            </a>
          </div>
          <div className={styles.departmentsContainer}>
            <Department
              title={musicDepartment}
              link="/music_department"
              img={musicImg}
            />
            <Department
              title={vocalDepartment}
              link="/vocal_department"
              img={vocalImg}
            />
            <Department
              title={choreografyDepartment}
              link="/сhoreographic_department"
              img={choreografyImg}
            />
            <Department
              title={artDepartment}
              link="/fine_arts_department"
              img={artImg}
            />
            <Department
              title={theaterDepartment}
              link="/theater_department"
              img={theaterImg}
            />
            <Department
              title={preschoolPreparatoryDepartment}
              link="/preschool_department"
              img={preschoolImg}
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Departments;
