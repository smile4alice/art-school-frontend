import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import useSlidersStore from '@/store/slidersStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SlidersTable from '@/components/admin-components/Sliders/SlidersTable/SlidersTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';

import styles from './SlidersAdmin.module.scss';

const breadcrumbs = ['Слайдери'];

const SlidersPageAdmin = () => {
  const { getSlides } = useSlidersStore();
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const slides = useSlidersStore(state => state.slides);
  const loading = useSlidersStore(state => state.loading);
  const error = useSlidersStore(state => state.error);
  const isAuthorized = useSlidersStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSlides();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getSlides]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Слайдери"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/sliders/add"
        isActionButtonDisabled={slides.length >= 8}
        actionButtonLabel="Додати слайд"
      />
      {error && <p className={styles.error}>{error}</p>}
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <SlidersTable data={slides} />
      )}
      {error && Object.keys(error).length && !slides.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default SlidersPageAdmin;
