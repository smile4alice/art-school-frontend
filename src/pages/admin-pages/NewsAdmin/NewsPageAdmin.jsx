import { useEffect } from 'react';
import useNewsStore from '@/store/newsStore';
import NewsTable from '@/components/admin-components/News/NewsTable/NewsTable';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';

const breadcrumbs = ['Новини'];

const NewsPageAdmin = () => {
  const { getNews } = useNewsStore();
  const news = useNewsStore(state => state.news);
  const loading = useNewsStore(state => state.loading);

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
      {loading ? <SpinnerAdmin /> : <NewsTable data={news} />}
    </div>
  );
};

export default NewsPageAdmin;
