import articles from '@/data/departments/vocal';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const VocalDepartment = () => {
  return (
    <>
      <SEO
        title="Вокально-хорове відділення Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description="Вокально-хорове відділення дитячої школи мистецтв №2 ім. М.І.Вериківського пропонує навчання в таких відділах:
        Хоровий відділ, Відділ сольного співу, Відділ естрадного вокалу, Відділ народного співу."
      />
      <DepartmentPage
        id={'2'}
        showSelect={true}
        title={'Вокально-хорове відділення'}
        articles={articles}
      />
    </>
  );
};

export default VocalDepartment;
