import articles from '@/data/departments/choreographic';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const ChoreographicDepartment = () => {
  return (
    <>
    <SEO
        title="Хореографічне відділення Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description='Хореографічне відділення дитячої школи мистецтв №2 ім. М.І.Вериківського пропонує навчання в таких відділах:
        Відділ класичного танцю, Відділ народного танцю, Відділ сучасного танцю.'
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
