import { useEffect, useState } from 'react';
import usePostersStore from '@/store/posterStore';

import Container from '@/components/Container/Container';
import ViewButton from '@/components/ui/Buttons/ViewButton/ViewButton';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './PostersPage.module.scss';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import SEO from '@/components/SEO';
import { useModal } from '@/store/modalStore';
import Modal from '@/components/Modal/Modal';

const PostersPage = () => {
  const ITEMS_PER_PAGE = 6;
  const { getPosters } = usePostersStore();
  const posters = usePostersStore(state => state.posters);
  const loading = usePostersStore(state => state.loading);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [postersPerPage, setPostersPerPage] = useState(6);
  const { isModalOpen, openModal } = useModal();
  const [selectedImg, setSelectedImg] = useState({});
  const isMaxAmount = postersPerPage >= posters.length;

  const setActiveImgUrl = id => {
    const selectImg = posters.find(poster => poster.id === id);
    setSelectedImg(selectImg);
  };

  const viewMore = () => {
    if (!isMaxAmount) {
      setPostersPerPage(prev => prev + ITEMS_PER_PAGE);
    }
  };

  const viewLess = () => {
    setPostersPerPage(ITEMS_PER_PAGE);
    window.scrollTo(0, 0);
  };

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 768) {
      setPostersPerPage(4);
    }
    if (windowWidth >= 768 && windowWidth <= 1279) {
      setPostersPerPage(8);
    }
    if (windowWidth >= 1280) {
      setPostersPerPage(ITEMS_PER_PAGE);
    }
  }, [windowWidth]);

  return (
    <>
      <SEO
        title="Афіша КДШМ №2 ім. М.І.Вериківського"
        description="Детальніше про мистецькі заходи, представленні відділеннями школи можна дізнатися на сторінці Афіша КДШМ №2 ім. М.І.Вериківського."
      />
      <Container>
        {!loading ? (
          <section className={styles.contentWrapper}>
            <h1 className={styles.pageTitle}>Афіша</h1>
            {posters?.length > 0 ? (
              <ul className={styles.postersList}>
                {posters.slice(0, postersPerPage).map((poster, index) => (
                  <li key={index} className={styles.postersListItem}>
                    <div className={styles.postersListItemImg}>
                      <img
                        className={styles.image}
                        src={poster.photo}
                        alt={`Афіша  ${poster.title}`}
                        onClick={() => {
                          setActiveImgUrl(poster.id);
                          openModal();
                        }}
                      />
                    </div>
                    <div className={styles.postersListItemText}>
                      {poster.title}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Placeholder />
            )}

            {isModalOpen && (
              <Modal>
                <img
                  src={selectedImg.photo}
                  alt={`Афіша  ${selectedImg.title}`}
                />
              </Modal>
            )}
            {posters.length > ITEMS_PER_PAGE && (
              <ViewButton
                isMaxAmount={isMaxAmount}
                viewMore={viewMore}
                viewLess={viewLess}
              />
            )}
          </section>
        ) : (
          <Spinner />
        )}
      </Container>
    </>
  );
};

export default PostersPage;
