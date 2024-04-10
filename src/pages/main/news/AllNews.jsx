import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import NewsItem from './news_item/NewsItem';
import Container from '@/components/Container/Container';
import ArrowIcon from '@/components/Icons/Arrow/Arrow';
import styles from './AllNews.module.scss';
import SEO from '@/components/SEO';

const AllNews = () => {
  const { getAllNewsPage } = useNewsStore();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [loadingState, setLoadingState] = useState('loading');

  const fetchData = async () => {
    try {
      setLoadingState('loading');
      const result = await getAllNewsPage(page, pageSize);
      setPageCount(result.pages);
      if (page === 1) {
        // Заміна даних при завантаженні першої сторінки
        setData(result.items);
      } else {
        // Додавання нових даних до поточних при завантаженні наступних сторінок
        setData(prevImages => [...prevImages, ...result.items]);
      }
      setLoadingState('success');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [getAllNewsPage, page, pageSize]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const changePage = () => {
    if (page < pageCount) {
      setPage(prevPage => prevPage + 1);
    } else {
      setPage(1);
      window.scrollTo(0, 0);
    }
  };
  return (
    <>
      <SEO
        title="Київська дитяча школа мистецтв - події."
        description="Школа мистецтв Київ. Київська дитяча школа мистецтв. Події Київської дитячої школи мистецтв №2 ім. М.І.Вериківського. Події КДШМ №2 ім. М.І.Вериківського."
      />
      <Container>
        <section className={styles.wrapper}>
          <h1 className={`${styles.title} sectionTitle`}>Заходи</h1>

          <div className={styles.newsWrapper}>
            {data?.length > 0 &&
              data.map((item, index) => (
                <Link
                  to={`/events/${item.title}`}
                  state={{ post: item }}
                  key={index}
                  rel="canonical"
                >
                  <NewsItem
                    imgSrc={item.photo}
                    date={item.created_at}
                    title={item.title}
                  />
                </Link>
              ))}
          </div>
          {loadingState === 'loading' && <Spinner />}
          {pageCount > 1 && (
            <button
              className={`${styles.showMore} ${
                page < pageCount ? '' : styles.noMore
              }`}
              onClick={changePage}
            >
              {page < pageCount ? 'Дивитися більше' : 'Дивитися менше'}
              <ArrowIcon />
            </button>
          )}
        </section>
      </Container>
    </>
  );
};

export default AllNews;

/*
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import NewsItem from './news_item/NewsItem';
import Container from '@/components/Container/Container';
import ViewButton from '@/components/ui/Buttons/ViewButton/ViewButton';
import styles from './AllNews.module.scss';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import SEO from '@/components/SEO';

const AllNews = () => {
  const ITEMS_PER_PAGE = 6;
  const { getNews } = useNewsStore();
  const news = useNewsStore(state => state.news);
  const loading = useNewsStore(state => state.loading);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const isMaxAmount = itemsPerPage >= news.length;

  const viewMore = () => {
    if (!isMaxAmount) {
      setItemsPerPage(prev => prev + ITEMS_PER_PAGE);
    }
  };
  const viewLess = () => {
    setItemsPerPage(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchNews = async () => {
      await getNews();
    };
    fetchNews();
  }, [getNews]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <SEO
        title="Події КДШМ №2 ім. М.І.Вериківського"
        description="Детальніше про всі події школи та її вихованців можна дізнатися на сторінці Події КДШМ №2 ім. М.І.Вериківського."
      />
      <Container>
        <section className={styles.wrapper}>
          <h1 className={`${styles.title} sectionTitle`}>Заходи</h1>
          {loading ? (
            <Spinner />
          ) : (
            <div className={styles.newsWrapper}>
              {news && Array.isArray(news) && news.length > 0 ? (
                news.slice(0, itemsPerPage).map((item, index) => (
                  <Link
                    to={`/events/${item.title}`}
                    state={{ post: item }}
                    key={index}
                    rel="canonical"
                  >
                    <NewsItem
                      imgSrc={item.photo}
                      date={item.created_at}
                      title={item.title}
                    />
                  </Link>
                ))
              ) : (
                <Placeholder />
              )}
            </div>
          )}
          <div className={styles.buttonContainer}>
            {news.length > ITEMS_PER_PAGE && (
              <ViewButton
                isMaxAmount={isMaxAmount}
                viewMore={viewMore}
                viewLess={viewLess}
              />
            )}
          </div>
        </section>
      </Container>
    </>
  );
};

export default AllNews;
*/
