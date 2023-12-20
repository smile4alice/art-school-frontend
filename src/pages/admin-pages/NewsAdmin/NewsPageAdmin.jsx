import { useEffect } from 'react';
import useNewsStore from '@/store/newsStore';
import NewsTable from '@/components/admin-components/News/NewsTable/NewsTable';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Новини'];

const NewsPageAdmin = () => {
  const { getNews } = useNewsStore();
  const news = useNewsStore(state => state.news);

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
      <NewsTable data={news} />
    </div>
  );
};

export default NewsPageAdmin;
