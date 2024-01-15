import articles from '@/data/departments/preschool';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const PreschoolDepartment = () => {
  return (
    <>
      <SEO
        title="Дошкільне та підготовче відділення Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description='Дошкільне та підготовче відділення дитячої школи мистецтв №2 ім. М.І.Вериківського проводить набір дітей віком від 1 року до 6 років. Основні завдання : ознайомлення з основними видами мистецтв, надання можливості дитині спробувати себе у різноманітній творчій діяльності, підготовка дітей до загальноосвітньої школи та школи мистецтв.'
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
