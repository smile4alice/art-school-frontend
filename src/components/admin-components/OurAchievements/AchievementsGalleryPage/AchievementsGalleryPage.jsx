import { useEffect, useState } from 'react';
import useServicesStore from '@/store/serviseStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import CustomTitle from '@/components/admin-components/OurAchievements/CustomTitle/CustomTitle';
import SelectAdminDouble from '@/components/admin-components/OurAchievements/SelectAdminDouble/SelectAdminDouble';
import AchievementsTable from '@/components/admin-components/OurAchievements/AchievementsTable/AchievementsTable';
import GalleryTable from '@/components/admin-components/OurAchievements/GalleryTable/GalleryTable';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import s from '../../../../pages/admin-pages/OurAchievementsAdmin/AchievementsAdmin.module.scss';

const AchievementsGalleryPage = ({
  url,
  pageTitle,
  actionButtonLink,
  actionButtonLabel,
  selectTitle,
  buttonTitle1,
  buttonTitle2,
}) => {
  const { getMainAchievements, getDepartmentAchievements } = useServicesStore();
  const achievements = useServicesStore(state => state.achievements);
  const gallery = useServicesStore(state => state.gallery);
 // const achievementsPages = useServicesStore(state => state.achievementsPages);
  const [departmentId, setDepartmentId] = useState('1');
  const [title, setTitle] = useState(selectTitle);
  const [typeOfAchievements, setTypeOfAchievements] = useState('allAchievements');
  const [loadingState, setLoadingState] = useState('success');
  //const [page, setPage] = useState(1);
  //const [isFetching, setIsFetching] = useState('true')
  //const pageSize = '5';
  let breadcrumbs;
/*
  const changePage = () => {
    if(page < achievementsPages){
      setPage(page + 1);
      setIsFetching(true);
    }
    
  }
*/
  const setBreadcrumbs = (url, title) => {
    if (url === 'achievements') {
      breadcrumbs = ['Наші Досягнення'];
    } else if (url === 'gallery') {
      breadcrumbs = ['Фотогалерея'];
    }
    if (title !== selectTitle && typeOfAchievements !== 'mainAchievements') {
      breadcrumbs.push(title);
    }
    if (typeOfAchievements === 'mainAchievements') {
      breadcrumbs.push(
        url === achievements
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
/*
  useEffect(()=>{
   // console.log(page);
    //console.log(achievementsPages);
    if(isFetching && typeOfAchievements === 'allAchievements'){
      const fetchData = async () => {
        try {
          setLoadingState('loading');
            await getAllAchievements(url, page, pageSize);
          setLoadingState('success');
        
        } catch (error) {
          console.log(error);
          setLoadingState('error');
        }
      };
      fetchData();
    }
    
  },[getAllAchievements,
    typeOfAchievements,
    page, achievementsPages,
    pageSize,
    url, isFetching])
*/

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState('loading');
        if (typeOfAchievements === 'mainAchievements') {
          await getMainAchievements(url);
        } else if (typeOfAchievements === 'departmentAchievements') {
          await getDepartmentAchievements(url, departmentId);
        }
        setLoadingState('success');
      } catch (error) {
        console.log(error);
        setLoadingState('error');
      }
    };
    fetchData();
  }, [
    getMainAchievements,
    getDepartmentAchievements,
    typeOfAchievements,
    departmentId,
    url,
  ]);

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
      {loadingState === 'loading' && (
        <div className={s.errorData}>
          <SpinnerAdmin />
        </div>
      )}
      {url === 'achievements' && loadingState === 'success' &&  (
        <AchievementsTable
          //data={achievements}
          url={url}
          typeOfAchievements={typeOfAchievements}
         // changePage={changePage}
         // page={page}
        />
      )}
      {url === 'gallery' && loadingState === 'success' &&  (
        <GalleryTable
          data={gallery}
          url={url}
          typeOfAchievements={typeOfAchievements}
        />
      )}
      {loadingState === 'error' && <PlaceholderAdmin />}
    </div>
  );
};

export default AchievementsGalleryPage;
