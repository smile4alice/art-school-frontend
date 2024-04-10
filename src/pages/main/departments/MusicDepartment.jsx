import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import articles from '@/data/departments/music';
import SEO from '@/components/SEO';

const MusicDepartment = () => {
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - музичне відділення."
        description="Уроки гри на музичних інструментах Київ. Уроки гри на флейті, скрипці, віолончелі. Уроки гри на саксофоні, сопілці, трубі. Уроки гри на ударних інструментах."
      />
      <DepartmentPage
        id={'1'}
        showSelect={true}
        title={'Музичне відділення'}
        articles={articles}
      />
    </>
  );
};

export default MusicDepartment;
