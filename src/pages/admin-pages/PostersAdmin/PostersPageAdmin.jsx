import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersList from '@/components/admin-components/Posters/postersList/PostersList';
import usePostersStore from '@/store/posterStore';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import styles from './PostersAdmin.module.scss';

const breadcrumbs = ['Афіші'];

const PostersPageAdmin = () => {
  const { getPosters } = usePostersStore();
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const posters = usePostersStore(state => state.posters);
  const loading = usePostersStore(state => state.loading);
  const error = usePostersStore(state => state.error);
  const isAuthorized = usePostersStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPosters();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPosters]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Афіші"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/posters/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати афішу"
      />
      {error && <p className={styles.error}>{error}</p>}
      {loading ? <SpinnerAdmin /> : <PostersList data={posters} />}
      {error && Object.keys(error).length && !posters.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default PostersPageAdmin;
