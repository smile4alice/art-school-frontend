import articles from '@/data/departments/finearts';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const FineArtsDepartment = () => {
  return (
    <>
      <SEO
        title="Образотворче відділення КДШМ №2 ім. М.І.Вериківського"
        description="Відділи образотворчого відділення: Розвиток образотворчої уяви та мислення 1-4 класи, Живопис 4-7 класи, Дизайнерсько-графічний напрямок 4-7 класи."
      />
      <DepartmentPage
        id={'5'}
        showSelect={true}
        title={'Образотворче відділення'}
        articles={articles}
      />
    </>
  );
};

export default FineArtsDepartment;
