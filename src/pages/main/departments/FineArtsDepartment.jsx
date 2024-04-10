import articles from '@/data/departments/finearts';
import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import SEO from '@/components/SEO';
const FineArtsDepartment = () => {
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - образотворче відділення."
        description="КДШМ №2 ім. М.І.Вериківського. Школа мистецтв Київ. Образотворча школа Київ. Уроки живопису Київ. Уроки дизайну Київ. Розвиток уяви та мислення Київ."
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
