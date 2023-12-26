import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import music from '@/data/departments/music';

const MusicDepartment = () => {
  return (
    <DepartmentPage
      id={'1'}
      showSelect={true}
      title={'Музичне відділення'}
      article={music}
    />
  );
};

export default MusicDepartment;
