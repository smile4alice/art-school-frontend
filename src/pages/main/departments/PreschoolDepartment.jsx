import articles from '@/data/departments/preschool';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const PreschoolDepartment = () => {
  return (
    <>
      <SEO
        title="Дошкільне відділення КДШМ №2 ім. М.І.Вериківського"
        description='Дошкільне та підготовче відділення КДШМ №2 ім. М.І.Вериківського проводить набір дітей віком від 1 року до 6 років.'
      />
      <DepartmentPage
        id={'6'}
        showSelect={false}
        title={'Дошкільне та підготовче відділення'}
        articles={articles}
      />
    </>
  );
};

export default PreschoolDepartment;
