import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/departments/GalleryDepartments/GalleryDepartments';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';
import News from '@/components/main/News/News';
import useServicesStore from '@/store/serviseStore';
import Articles from '../DepartmentArticles/Articles';
import styles from './DepartmentPage.module.scss';
import Spinner from '@/components/ui/Spinner/Spinner';

const DepartmentPage = ({ id, title, articles, showSelect }) => {
  const subDepartments = useServicesStore(state => state.subDepartments);
  const { getSubDepartments } = useServicesStore();
  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSubDepartments(id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id, getSubDepartments]);

  useEffect(() => {
    setDepartmentId(subDepartments?.[0]?.id);
  }, [subDepartments]);

  return (
    <>
      <section className={styles.departmentSection}>
        <Container>
          <div className={styles.contentWrapper}>
            <h1 className="department_title ">{title}</h1>
            {subDepartments?.length > 0 ? (
              <div className={styles.wrapper}>
                <Articles articles={articles} title={title} />
                <DropDownsList departmentId={id} />
                <News
                  selectOptions={subDepartments}
                  subDepartmentId={departmentId}
                />
                 <GalleryDepartments
                  showSelect={showSelect}
                  selectOptions={subDepartments}
                  url={'gallery'}
                  subDepartmentId={departmentId}
                />
                <Achievements
                  title={'Досягнення відділу'}
                  showSelect={showSelect}
                  selectOptions={subDepartments}
                  url={'achievement'}
                  subDepartmentId={departmentId}
                />
              </div>
            ) : (
              <Spinner />
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default DepartmentPage;
