import { useEffect, useState, lazy, Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import usePostersStore from '@/store/posterStore';
import ArrowIcon from '@/components/Icons/Arrow/Arrow';
import Container from '@/components/Container/Container';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './PostersPage.module.scss';
import SEO from '@/components/SEO';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));

const PostersPage = () => {
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isLaptop = useMediaQuery({ minWidth: 768 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const { getAllPostersPage } = usePostersStore();
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const pageSize = isDesktop ? 9 : isLaptop ? 8 : 4;
  const [loadingState, setLoadingState] = useState('loading');

  const setActiveImgUrl = id => {
    const selectImg = data.find(poster => poster.id === id);
    setSelectedImg(selectImg);
  };

  const fetchData = async () => {
    try {
      setLoadingState('loading');
      const result = await getAllPostersPage(page, pageSize);
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
  }, [getAllPostersPage, page, pageSize]);

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
        title="Афіша КДШМ №2 ім. М.І.Вериківського"
        description="Детальніше про мистецькі заходи, представленні відділеннями школи можна дізнатися на сторінці Афіша КДШМ №2 ім. М.І.Вериківського."
      />
      <Container>
        <section className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>Афіша</h1>

          <ul className={styles.postersList}>
                {data?.length > 0 && (
                
                data.map((poster, index) => (
                  <li key={index} className={styles.postersListItem}>
                    <div className={styles.postersListItemImg}>
                      <img
                        className={styles.image}
                        src={poster.photo}
                        alt={
                          selectedImg.title
                            ? selectedImg.title
                            : `КДШМ М.І.Вериківського афіша ${index + 1}`
                        }
                        onClick={() => {
                          setActiveImgUrl(poster.id);
                          setIsModalOpen(!isModalOpen);
                        }}
                      />
                    </div>
                    <div className={styles.postersListItemText}>
                      {poster.title}
                    </div>
                  </li>
                ))
                )}
              </ul>
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
        {isModalOpen && (
          <Suspense>
            <Modal
              isModalOpen={isModalOpen}
              closeModal={setIsModalOpen}
              accentIcon={true}
            >
              <img
                src={selectedImg.photo}
                alt={
                  selectedImg.title
                    ? selectedImg.title
                    : `КДШМ М.І.Вериківського афіша`
                }
              />
            </Modal>
          </Suspense>
        )}
      </Container>
    </>
  );
};

export default PostersPage;
