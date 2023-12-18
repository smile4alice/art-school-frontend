import { useEffect, useState } from 'react';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementsTable from '@/components/admin-components/OurAchievements/AchievementsTable/AchievementsTable';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import s from './AchievementsAdmin.module.scss';

const url = 'sub_department_achievement/';
const OurAchievementsPage = () => {
  const { getAllAchievements, getMainAchievements, getDepartmentAchievements } =
    useServicesStore();
  const [achievements, setAchievements] = useState([]);
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState('Всі досягнення');
  const [typeOfAchievements, setTypeOfAchievements] =
    useState('allAchievements');
  const [loadingState, setLoadingState] = useState('loading');
  const page = '1';
  const pageSize = '20';

  //встановлення id відділу через select, якщо все вірно
  const changeDepartment = (id, title) => {
    if (id !== undefined && id !== null) {
      setDepartmentId(id);
      setTitle(title);
      setTypeOfAchievements('departmentAchievements');
    }
  };
  useEffect(() => {}, [departmentId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        setLoadingState('loading');
        if (typeOfAchievements === 'allAchievements') {
          result = await getAllAchievements(page, pageSize);
        } else if (typeOfAchievements === 'mainAchievements') {
          result = await getMainAchievements('achievements', departmentId);
        } else if (typeOfAchievements === 'departmentAchievements') {
          result = await getDepartmentAchievements(url, departmentId);
        }
        setAchievements(result);
        setLoadingState('success');
      } catch (error) {
        console.error(error);
        setLoadingState('error');
      }
    };

    fetchData();
  }, [
    getAllAchievements,
    getMainAchievements,
    getDepartmentAchievements,
    typeOfAchievements,
    departmentId,
    page,
    pageSize,
  ]);

  return (
    <div className={s.container}>
      <PageTitle
        title="Наші досягнення"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/achievements/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати досягнення"
      />
      <div className={s.selectsContainer}>
        <div className={s.selectButtons}>
          <button
            className={typeOfAchievements === 'allAchievements' ? s.active : ''}
            onClick={() => {
              setTitle('Всі досягнення');
              setTypeOfAchievements('allAchievements');
            }}
          >
            Сторінка Наші досягнення
          </button>
          <button
            className={
              typeOfAchievements === 'mainAchievements' ? s.active : ''
            }
            onClick={() => {
              setTypeOfAchievements('mainAchievements');
            }}
          >
            Закріпленні досягнення
          </button>
        </div>
        {typeOfAchievements !== 'mainAchievements' && (
          <div className={s.selectDepartments}>
            <SelectAdminDouble changeDepartment={changeDepartment} />
          </div>
        )}
      </div>
      {typeOfAchievements !== 'mainAchievements' && (
        <CustomTitle title={title} />
      )}
      {loadingState === 'loading' && (
        <div className={s.errorData}>
          <SpinnerAdmin />
        </div>
      )}
      {loadingState === 'success' && (
        <AchievementsTable
          data={achievements}
          typeOfAchievements={typeOfAchievements}
        />
      )}
      {loadingState === 'error' && <PlaceholderAdmin />}
    </div>
  );
};

export default OurAchievementsPage;
