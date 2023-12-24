import { useEffect, useState } from 'react';

import Modal from './Modal';
import Container from '@/components/Container/Container';

import styles from './PostersPage.module.scss';
import ViewButton from '@/components/ui/Buttons/ViewButton/ViewButton';
import usePostersStore from '@/store/posterStore';
import Spinner from '@/components/ui/Spinner/Spinner';

const PostersPage = () => {
  const { getPosters } = usePostersStore();
  const posters = usePostersStore(state => state.posters);
  const loading = usePostersStore(state => state.loading);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [postersPerPage, setPostersPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const isMaxAmount = postersPerPage >= posters.length - 1;

  const setActiveImgUrl = id => {
    const selectImg = posters.find(poster => poster.id === id);
    setSelectedImg(selectImg);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const viewMore = () => {
    if (!isMaxAmount) {
      setPostersPerPage(prev => prev + 12);
    }
  };

  const viewLess = () => {
    setPostersPerPage(12);
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
      setPostersPerPage(12);
    }
  }, [windowWidth]);

  return (
    <Container>
      <section className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>Афіша</h1>
        {!loading ? (
          <ul className={styles.postersList}>
            {posters.slice(0, postersPerPage).map((poster, index) => (
              <li key={index} className={styles.postersListItem}>
                <img
                  className={styles.postersListItemImg}
                  src={poster.photo}
                  alt={`Афіша  ${poster.title}`}
                  onClick={() => {
                    setActiveImgUrl(poster.id);
                    toggleModal();
                  }}
                />
                <p className={styles.postersListItemText}>{poster.title}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Spinner />
        )}

        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img src={selectedImg.photo} alt={`Афіша  ${selectedImg.title}`} />
          </Modal>
        )}
        {posters.length > postersPerPage && (
          <ViewButton
            isMaxAmount={isMaxAmount}
            viewMore={viewMore}
            viewLess={viewLess}
          />
        )}
      </section>
    </Container>
  );
};

export default PostersPage;
