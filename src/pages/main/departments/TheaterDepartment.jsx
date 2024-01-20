import articles from '@/data/departments/theater';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const TheaterDepartment = () => {
  return (
    <>
      <SEO
        title="Театральне відділення КДШМ №2 ім. М.І.Вериківського"
        description="Театральне відділення: пропонує навчання за такими напрямками: Акторська майстерність, Сценічна практика, Сценічне мовлення, Вокал, Сценічний рух."
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
