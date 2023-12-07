import { useState, useEffect } from 'react';
import useNewsStore from '@/store/newsStore';
import NewsTable from '@/components/admin-components/News/NewsTable/NewsTable';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';

const NewsPageAdmin = () => {
  const { getNews } = useNewsStore();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getNews();
        setNews(result.items);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getNews]);

  return (
    <div>
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
