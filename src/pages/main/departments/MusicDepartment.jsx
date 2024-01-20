import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import articles from '@/data/departments/music';
import SEO from '@/components/SEO';
const MusicDepartment = () => {
  return (
    <>
      <SEO
        title="Музичне відділення КДШМ №2 ім. М.І.Вериківського"
        description="Відділи музичного відділення: Струнний, Духовий, Народний, Теоретичний, Джазовий, Фортепіано, Концертмейстрів, Камерного ансамблю, Історія мистецтв."
      />
      <DepartmentPage
        id={'1'}
        showSelect={true}
        title={'Музичне відділення'}
        articles={articles}
      />
    </>
  );
};

export default MusicDepartment;
