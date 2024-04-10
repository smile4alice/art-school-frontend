import articles from '@/data/departments/choreographic';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const ChoreographicDepartment = () => {
  return (
    <>
    <SEO
        title="Київська дитяча школа мистецтв - хореографічне відділення."
        description='Школа мистецтв Київ.  Уроки хореографії Київ. Хореографічна школа Київ пропонує: уроки класичної хореографії, уроки танців модерн, уроки сучасних танців.'
      />
    <DepartmentPage
      id={'3'}
      showSelect={true}
      title={'Хореографічне відділення'}
      articles={articles}
    />
    </>
  );
};

export default ChoreographicDepartment;
