import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/departments/GalleryDepartments/GalleryDepartments';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';
import useServicesStore from '@/store/serviseStore';
import Article from '../DepartmentArticle/Article';
import styles from './DepartmentPage.module.scss';


const DepartmentPage = ({ id, title, showSelect, articles }) => {
  const { getSubDepartments } = useServicesStore();
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
        const result = await getSubDepartments(id);
        setSubDepartments(result);
        setDepartmentId(result[0].id);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [id, getSubDepartments]);

  useEffect(() => {
    changeDepartment(departmentId);
  }, [departmentId]);

  return (
    <Container>
      <h2 className={styles.title}>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <div className={styles.wrapper}>
          {articles &&
            Array.isArray(articles) &&
            articles.map((article, index) => (
              <Article key={index} index={index} article={article} />
            ))}
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
