import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/departments/GalleryDepartments/GalleryDepartments';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';
import useServicesStore from '@/store/serviseStore';
import Articles from '../DepartmentArticles/Articles';
import styles from './DepartmentPage.module.scss';

const DepartmentPage = ({ id, title, showSelect, articles }) => {
  const { getDepartments } = useServicesStore();
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeDepartment = url => {
    setDepartmentId(url);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDepartments(id);
        setSubDepartments(result);
        setDepartmentId(result[0].id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id, getDepartments]);

  useEffect(() => {
    changeDepartment(departmentId);
  }, [departmentId]);

  return (
    <Container>
      <h2 className={styles.title}>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <div className={styles.wrapper}>
          <Articles articles={articles} />

          <DropDownsList departmentId={id} />
          <GalleryDepartments
            showSelect={showSelect}
            selectOptions={subDepartments}
            url={'departments/sub_department_gallery/'}
            departmentId={departmentId}
            changeDepartment={changeDepartment}
          />
          <Achievements
            title={'Досягнення відділу'}
            showSelect={showSelect}
            selectOptions={subDepartments}
            url={'departments/sub_department_achievement/'}
            departmentId={departmentId}
            changeDepartment={changeDepartment}
          />
        </div>
      )}
    </Container>
  );
};

export default DepartmentPage;
