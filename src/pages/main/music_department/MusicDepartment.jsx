import Achievements from '@/components/main/Achievements/Achievements';
import Container from '@/components/Container/Container';
import DropDownsList from '@/components/ui/DropDownsList/DropDownsList';

//import s from './MusicDepartment.module.scss'

const MusicDepartment = () => {



  const musicSubDepartments = [
    {
      id: 1,
      sub_department_name: 'Струнний відділ',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 2,
      sub_department_name: 'Духовий відділ',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 3,
      sub_department_name: 'Народний відділ',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 4,
      sub_department_name: 'Теоретичний відділ',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 5,
      sub_department_name: 'Джазовий відділ',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 6,
      sub_department_name: 'Відділ спеціалізованого та загального фортепіано',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 7,
      sub_department_name: 'Відділ концертмейстрів',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 8,
      sub_department_name: 'Відділ камерного ансамблю',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
      main_department_id: 1,
    },
    {
      id: 9,
      sub_department_name: 'Історія мистецтв',
      description:
        'Sometimes work let purpose guess trouble central. …film you kid site once since. Road too cost wait.',
    },
  ];

  return (
    <Container>
      <Achievements
        title={'Досягнення відділу'}
        showSelect={true}
        selectOptions={musicSubDepartments}
        url={'departments/sub_department_achievement/'}
      />

      <DropDownsList departmentId={'1'} />
    </Container>
  );
};

export default MusicDepartment;
