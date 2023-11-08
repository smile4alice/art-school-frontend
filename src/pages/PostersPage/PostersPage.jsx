import Container from '@/components/Container/Container';

import styles from './PostersPage.module.scss';
import { posters } from '@/constants/posters';
import { useEffect, useState } from 'react';
import Modal from './Modal';

const PostersPage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [postersPerPage, setPostersPerPage] = useState(12);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});

  const setActiveImgUrl = id => {
    const selectImg = posters.find(poster => poster.id === id);
    setSelectedImg(selectImg);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const viewMore = () => setPostersPerPage(prev => prev + postersPerPage);

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
    if (windowWidth <= 320) {
      setPostersPerPage(4);
    }
  }, [windowWidth]);
  return (
    <Container>
      <section className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>Афіша</h1>

        <ul className={styles.postersList}>
          {posters.slice(0, postersPerPage).map((poster, index) => (
            <li key={index} className={styles.postersListItem}>
              <img
                className={styles.posterImg}
                src={poster.url}
                alt={`Афіша  ${poster.title}`}
                onClick={() => {
                  setActiveImgUrl(poster.id);
                  toggleModal();
                }}
              />
              <p>{poster.title}</p>
            </li>
          ))}
        </ul>
        {showModal && (
          <Modal toggleModal={toggleModal}>
            <img src={selectedImg.url} alt={`Афіша  ${selectedImg.title}`} />
          </Modal>
        )}
        <button className={styles.buttonViewMore} onClick={viewMore}>
          Дивитися Більше
          <div className={styles.iconMore}>
            <span></span>
          </div>
        </button>
      </section>
    </Container>
  );
};

export default PostersPage;
