import articles from '@/data/departments/music';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import music from '@/data/departments/music';

const MusicDepartment = () => {
  return (
    <DepartmentPage
      id={'1'}
      showSelect={true}
      title={'Музичне відділення'}
<<<<<<< HEAD
      article={music}
=======
      articles={articles}
>>>>>>> d2f61b3a048a6ce36533f996ee9466776df8f179
    />
  );
};

export default MusicDepartment;
