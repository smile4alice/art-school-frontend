import articles from '@/data/departments/theater';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const TheaterDepartment = () => {
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - театральне відділення."
        description="Театральна школа Київ. Уроки акторської майстерності Київ. Театральне мистецтво Київ. Сценічна практика Київ. Сценічне мовлення Київ. Сценічний рух Київ."
      />
      <DepartmentPage
        id={'4'}
        showSelect={false}
        title={'Театральне відділення'}
        articles={articles}
      />
    </>
  );
};

export default TheaterDepartment;
