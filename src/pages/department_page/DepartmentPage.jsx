import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalaryDepartments from '@/components/main/GalaryDepartments/GalaryDepartments';
import useServicesStore from '@/store/serviseStore';
import s from './DepartmentPage.module.scss'

const DepartmentPage = ({ id, title, showSelect}) => {
  const { getDepartments } = useServicesStore();
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');

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
      <h2 className={s.title}>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <>
          <GalaryDepartments
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
        </>
      )}
    </Container>
  );
};

export default DepartmentPage;
