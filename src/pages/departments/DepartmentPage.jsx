import { useState, useEffect } from 'react';
import Container from '@/components/Container/Container';
import Achievements from '@/components/main/Achievements/Achievements';
import GalleryDepartments from '@/components/departments/GalleryDepartments/GalleryDepartments';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';
import useServicesStore from '@/store/serviseStore';
import Article from '@/components/departments/article/Article';
import { articles } from '@/constants/articles';
import s from './DepartmentPage.module.scss';

const DepartmentPage = ({ id, title, showSelect }) => {
  const { getSubDepartments } = useServicesStore();
  const [subDepartments, setSubDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState('');
  const [articlesLength, setArticlesLength] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changeDepartment = url => {
    setDepartmentId(url);
  };

  useEffect(() => {
    setArticlesLength(1);
    if (id === '4') {
      setArticlesLength(3);
    }
    if (id === '6') {
      setArticlesLength(2);
    }
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
      <h2 className={s.title}>{title}</h2>
      {subDepartments && subDepartments.length > 0 && (
        <div className={s.wrapper}>
          {articles &&
            Array.isArray(articles) &&
            articles
              .slice(0, articlesLength)
              .map((article, index) => (
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
