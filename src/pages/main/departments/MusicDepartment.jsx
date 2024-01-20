import DepartmentPage from '@/components/departments/DepartmentPage/DepartmentPage';
import articles from '@/data/departments/music';
import SEO from '@/components/SEO';

const MusicDepartment = () => {
  return (
    <>
      <SEO
        title="Музичне відділення Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description="Музичне відділення дитячої школи мистецтв №2 ім. М.І.Вериківського пропонує навчання в таких відділах:
        Струнний відділ, Духовий відділ, Народний відділ, Теоретичний відділ, Джазовий відділ, Відділ спеціалізованого та загального фортепіано, Відділ концертмейстрів, Відділ камерного ансамблю, Історія мистецтв."
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
