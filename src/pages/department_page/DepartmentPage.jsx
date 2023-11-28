import { useEffect, useState } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalaryDepartments from '@/components/main/GalaryDepartments/GalaryDepartments';
import useServicesStore from '@/store/serviseStore';

const DepartmentPage = ({ id, title }) => {
  const { getDepartments } = useServicesStore();
  const [subDepartments, setSubDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDepartments(id);
        setSubDepartments(result);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchData();
  }, [id, getDepartments]);

  return (
    <Container>
      <h2>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <>
          <GalaryDepartments
            showSelect={true}
            selectOptions={subDepartments}
            url={'departments/sub_department_gallery/'}
          />
          <Achievements
            title={'Досягнення відділу'}
            showSelect={true}
            selectOptions={subDepartments}
            url={'departments/sub_department_achievement/'}
          />
        </>
      )}
    </Container>
  );
};

export default DepartmentPage;
