import articles from '@/data/departments/theater';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const TheaterDepartment = () => {
  return (
    <>
      <SEO
        title="Театральне відділення Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description="Театральне відділення дитячої школи мистецтв №2 ім. М.І.Вериківського має такі основні напрямки: акторська майстерність, сценічна практика, сценічне мовлення, вокал, сценічний рух."
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
