import { useState } from 'react';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import VideoTable from '@/components/admin-components/Gallery/VideoTable/VideoTable';
import s from './VideoPage.module.scss';

const VideoPageAdmin = () => {
  const [typeOfAchievements, setTypeOfAchievements] =
  useState('allAchievements');
  const [title, setTitle] = useState('Всі відео');
  const [departmentId, setDepartmentId] = useState('1');
  let breadcrumbs = ['Відеогалерея']

  const setBreadcrumbs = ( title) => {
    if (title !== 'Всі відео' && typeOfAchievements !== 'mainAchievements') {
      breadcrumbs.push(title);
    }
    if (typeOfAchievements === 'mainAchievements') {
      breadcrumbs.push('Закріпленні відео');
    }
    return breadcrumbs;
  };
  setBreadcrumbs( title);

  const changeDepartment = (id, title) => {
    if (id !== undefined && id !== null) {
      setDepartmentId(id);
      setTitle(title);
      setTypeOfAchievements('departmentAchievements');
    }
  };

  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Відеогалерея"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/video/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати відео"
      />
      <div className={s.selectsContainer}>
        <div className={s.selectButtons}>
          <button
            className={typeOfAchievements === 'allAchievements' ? s.active : ''}
            onClick={() => {
              setTitle('Всі відео');
              setTypeOfAchievements('allAchievements');
            }}
          >
            Сторінка Відеогалерея
          </button>
          <button
            className={
              typeOfAchievements === 'mainAchievements' ? s.active : ''
            }
            onClick={() => {
              setTypeOfAchievements('mainAchievements');
            }}
          >
            Закріплені відео
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
      <VideoTable
        typeOfAchievements={typeOfAchievements}
        departmentId={departmentId}
      />
    </div>
  );
};

export default VideoPageAdmin;
