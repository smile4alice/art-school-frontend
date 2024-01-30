import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import useNewsStore from '@/store/newsStore';
import NewsTable from '@/components/admin-components/News/NewsTable/NewsTable';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import styles from './NewsAdmin.module.scss';

const breadcrumbs = ['Новини'];

const NewsPageAdmin = () => {
  const { getNews } = useNewsStore();
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const news = useNewsStore(state => state.news);
  const loading = useNewsStore(state => state.loading);
  const error = useNewsStore(state => state.error);
  const isAuthorized = useNewsStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getNews();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getNews]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Новини"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/news/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати новину"
      />
      {error && <p className={styles.error}>{error}</p>}
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <NewsTable data={news} />
      )}
      {error && Object.keys(error).length && !news.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default NewsPageAdmin;
