import { useEffect, useState } from 'react';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SelectAdminDouble from '@/components/admin-components/SelectAdminDouble/SelectAdminDouble';
//import AchievementsTable from './AchievementsTable/AchievementsTable';
import s from './AchievementsAdmin.module.scss';
const OurAchievementsPage = () => {
  const { getAllAchievements } = useServicesStore();
  // const [achievements, setAchievements] = useState([]);
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState('Всі досягнення');
  const [typeOfAchievements, setTypeOfAchievements] = useState('allAchievements');
  // const url = ''; ///departments/sub_department_achievement/';
  const page = '1';
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
  //завантаження всіх досягнень
  useEffect(() => {
    if (typeOfAchievements === 'allAchievements') {
      const fetchData = async () => {
        try {
          const result = await getAllAchievements(page, pageSize);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [getAllAchievements, typeOfAchievements, page, pageSize]);
  //завантаження досягнень головної сторінки
  useEffect(() => {
    if (typeOfAchievements === 'allAchievements') {
      const fetchData = async () => {
        try {
          const result = await getAllAchievements(page, pageSize);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [getAllAchievements, typeOfAchievements, page, pageSize]);
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
        <div className={s.title}>{title}</div>
      )}

    </div>
  );
};

export default OurAchievementsPage;

/*
 <AchievementsTable data={achievements} />

/*
<div>
        {loadingState === 'loading' && (
          <div>
            <SpinnerAdmin />
          </div>
        )}
        {loadingState && achievements && achievements.length > 0 &&
          <AchievementsTable data={achievements} handleScrollEnd={handleScrollEnd}/>
        }
      </div>
 */

/*
import { useState, useEffect } from 'react';
import useServicesStore from '@/store/serviseStore';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import AchievementsTable from './AchievementsTable/AchievementsTable';
import s from './AchievementsAdmin.module.scss'
const OurAchievementsPage = () => {
  const { getAchievements } = useServicesStore();
  const [achievements, setAchievements] = useState([]);
  const [departmentId, setDepartmentId] = useState('1');
  const [url, setUrl] = useState('departments/sub_department_achievement/');
  const [loadingState, setLoadingState] = useState('loading');
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const handleScrollEnd = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const result = await getAchievements(url, departmentId, page, pageSize);
        console.log(result);
  
        setAchievements((prevAchievements) => [...prevAchievements, ...result]);
        setLoadingState('success');
        setDepartmentId('1'); // видалити
        setUrl('departments/sub_department_achievement/'); // видалити
      } catch (error) {
        setLoadingState('error');
      }
    };
  
    fetchData();
  }, [getAchievements, url, departmentId, page, pageSize]);
  

  

  
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
      <div>
        {loadingState === 'loading' && (
          <div>
            <SpinnerAdmin />
          </div>
        )}
        {loadingState && achievements && achievements.length > 0 &&
          <AchievementsTable data={achievements} handleScrollEnd={handleScrollEnd}/>
        }
      </div>
    </div>
  );
};

export default OurAchievementsPage;
*/
