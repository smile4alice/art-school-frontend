import articles from '@/data/departments/vocal';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const VocalDepartment = () => {
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - вокально-хорове відділення."
        description="Дитяча музична школа Київ, пропонує: уроки вокалу Київ, уроки академічного вокалу, уроки джазового вокалу, уроки естрадного співу, уроки народного співу."
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
