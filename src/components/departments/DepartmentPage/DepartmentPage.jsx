import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/departments/GalleryDepartments/GalleryDepartments';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';
import useServicesStore from '@/store/serviseStore';
import Articles from '../DepartmentArticles/Articles';
import styles from './DepartmentPage.module.scss';


const DepartmentPage = ({ id, title, showSelect }) => {
  const subDepartments = useServicesStore(state => state.subDepartments);
  const { getSubDepartments } = useServicesStore();
  const [departmentId, setDepartmentId] = useState('1');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeDepartment = url => {
    setDepartmentId(url);
  };

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

  useEffect(()=>{
    console.log(subDepartments);
    setDepartmentId(subDepartments?.[0]?.id);
  }, [subDepartments])

  useEffect(() => {
    changeDepartment(departmentId);
  }, [departmentId]);

  return (
    <Container>
      <h2 className={styles.title}>{title}</h2>
      {subDepartments?.length > 0 && (
        <div className={styles.wrapper}>
          <Articles subDepartments={subDepartments} />
          <DropDownsList departmentId={id} />
          <GalleryDepartments
            showSelect={showSelect}
            selectOptions={subDepartments}
            url={'gallery'}
            departmentId={departmentId}
            changeDepartment={changeDepartment}
          />
          <Achievements
            title={'Досягнення відділу'}
            showSelect={showSelect}
            selectOptions={subDepartments}
            url={'achievement'}
            departmentId={departmentId}
            changeDepartment={changeDepartment}
          />
        </div>
      )}
    </Container>
  );
};

export default DepartmentPage;
