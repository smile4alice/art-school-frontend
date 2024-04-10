import articles from '@/data/departments/preschool';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const PreschoolDepartment = () => {
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - дошкільне відділення."
        description='КДШМ №2 ім. М.І.Вериківського. Київська дитяча школа мистецтв. Дошкільне виховання дітей Київ. Дошкільне виховання дітей віком від 1 року до 6 років.'
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
