import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/main/GalleryDepartments/GalleryDepartments';
import useServicesStore from '@/store/serviseStore';
import s from './DepartmentPage.module.scss';
import DepartmentDesctiption from './DepartmentDescription/DepartmentDesctiption';

import { theaterDepartmentData } from '@/constants/departmentsData/theaterDepartmentData';
import { musicDepartmentData } from '@/constants/departmentsData/musicDepartmentData';
console.log(' musicDepartmentData: ', musicDepartmentData);

const DepartmentPage = ({ id, title, showSelect }) => {
  const { getDepartments } = useServicesStore();
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [departmentInfo, setDepartmenInfo] = useState([]);

  const changeDepartment = url => {
    setDepartmentId(url);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
  useEffect(() => {
    changeDepartment(departmentId);
    switch (id) {
      case '1':
        setDepartmenInfo(musicDepartmentData);
        break;
      case '2':
        break;
      case '3':
        break;
      case '4':
        setDepartmenInfo(theaterDepartmentData);
        break;
      case '5':
        break;
      case '6':
        break;

      default:
      // code block
    }
  }, [departmentId]);

  return (
    <Container>
      <h2 className={s.title}>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <>
          <DepartmentDesctiption departmentInfo={departmentInfo} />
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
        </>
      )}
    </Container>
  );
};

export default DepartmentPage;
