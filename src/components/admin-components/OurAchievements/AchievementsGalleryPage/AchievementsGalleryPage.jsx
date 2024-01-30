import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementsTable from '@/components/admin-components/OurAchievements/AchievementsTable/AchievementsTable';
import GalleryTable from '@/components/admin-components/OurAchievements/GalleryTable/GalleryTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import s from '@/pages/admin-pages/OurAchievementsAdmin/AchievementsAdmin.module.scss';

const AchievementsGalleryPage = ({
  url,
  pageTitle,
  actionButtonLink,
  actionButtonLabel,
  selectTitle,
  buttonTitle1,
  buttonTitle2,
}) => {
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState(selectTitle);
  const error = useServicesStore(state => state.error);
  const isAuthorized = useServicesStore(state => state.isAuthorized);
  const [typeOfAchievements, setTypeOfAchievements] =
    useState('allAchievements');
  let breadcrumbs;

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  const setBreadcrumbs = (url, title) => {
    if (url === 'achievements') {
      breadcrumbs = ['Наші досягнення'];
    } else if (url === 'gallery') {
      breadcrumbs = ['Фотогалерея'];
    }
    if (title !== selectTitle && typeOfAchievements !== 'mainAchievements') {
      breadcrumbs.push(title);
    }
    if (typeOfAchievements === 'mainAchievements') {
      breadcrumbs.push(
        url === 'achievements'
          ? 'Закріпленні досягнення'
          : 'Закріпленні фотографії'
      );
    }
    return breadcrumbs;
  };
  setBreadcrumbs(url, title);
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
        title={pageTitle}
        showBackButton={false}
        showActionButton={true}
        actionButtonLink={actionButtonLink}
        isActionButtonDisabled={false}
        actionButtonLabel={actionButtonLabel}
      />
      {error && <p className="error">{error}</p>}
      <div className={s.selectsContainer}>
        <div className={s.selectButtons}>
          <button
            className={typeOfAchievements === 'allAchievements' ? s.active : ''}
            onClick={() => {
              setTitle(selectTitle);
              setTypeOfAchievements('allAchievements');
            }}
          >
            Сторінка {buttonTitle1}
          </button>
          <button
            className={
              typeOfAchievements === 'mainAchievements' ? s.active : ''
            }
            onClick={() => {
              setTypeOfAchievements('mainAchievements');
            }}
          >
            {buttonTitle2}
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
      {url === 'achievements' && (
        <AchievementsTable
          url={url}
          typeOfAchievements={typeOfAchievements}
          departmentId={departmentId}
        />
      )}
      {url === 'gallery' && (
        <GalleryTable
          url={url}
          typeOfAchievements={typeOfAchievements}
          departmentId={departmentId}
        />
      )}
    </div>
  );
};

export default AchievementsGalleryPage;
