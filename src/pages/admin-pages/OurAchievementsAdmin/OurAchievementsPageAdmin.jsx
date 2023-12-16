import { useEffect, useState } from 'react';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementsTable from '@/components/admin-components/OurAchievements/AchievementsTable/AchievementsTable';

import s from './AchievementsAdmin.module.scss';
const OurAchievementsPage = () => {
  const { getAllAchievements, getMainAchievements, getDepartmentAchievementsId } = useServicesStore();
  const [achievements, setAchievements] = useState([]);
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState('Всі досягнення');
  const [typeOfAchievements, setTypeOfAchievements] = useState('allAchievements');//allAchievements
  // const url = ''; ///departments/sub_department_achievement/';                 //mainAchievements
  const page = '1';                                                               //departmentAchievements
  const pageSize = '20';

  //встановлення id відділу через select, якщо все вірно
  const changeDepartment = (id, title) => {
    if (id !== undefined && id !== null) {
      setDepartmentId(id);
      setTitle(title);
      setTypeOfAchievements('departmentAchievements')
    }
  };
  useEffect(() => {
    // console.log(departmentId);
  }, [departmentId]);
  // achievements?page=1&size=50'

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (typeOfAchievements === 'allAchievements') {
          result = await getAllAchievements(page, pageSize);
        } else if (typeOfAchievements === 'mainAchievements') {
          result = await getMainAchievements('achievements', departmentId, page, pageSize);
        }else if (typeOfAchievements === 'departmentAchievements') {
          result = await getDepartmentAchievementsId(departmentId, page, pageSize);
        }
        setAchievements(result);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [getAllAchievements, getMainAchievements, getDepartmentAchievementsId, typeOfAchievements, departmentId, page, pageSize]);
  

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
            className={typeOfAchievements === 'mainAchievements' ? s.active : ''}
            onClick={() => {
              setTypeOfAchievements('mainAchievements');
            }}
          >
            Головна сторінка
          </button>
        </div>
        {typeOfAchievements !== 'mainAchievements' && (
          <div className={s.selectDepartments}>
            <SelectAdminDouble
              changeDepartment={changeDepartment}
            />
          </div>
        )}
      </div>
      {typeOfAchievements !== 'mainAchievements' && (
        <CustomTitle title={title}/>
      )}
      <AchievementsTable data={achievements} typeOfAchievements={typeOfAchievements}/>
    </div>
  );
};

export default OurAchievementsPage;
