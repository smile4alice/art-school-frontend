import { useState, useEffect, lazy, Suspense } from 'react';
import useServicesStore from '@/store/serviseStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import SortIcon from '@/components/Icons/SortIcon';
import ArrowIcon from '@/components/Icons/Arrow/Arrow';
import styles from './GalleryImages.module.scss';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));
const GalleryImages = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState({});
  const { getAllPhotoPage } = useServicesStore();
  const [images, setImages] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const [reverse, setReverse] = useState(true);
  const [loadingState, setLoadingState] = useState('loading');
  const setActiveImgUrl = id => {
    const selectImg = images.find(poster => poster.id === id);
    setSelectedImg(selectImg);
  };
  const fetchData = async () => {
    try {
      setLoadingState('loading');
      const result = await getAllPhotoPage(reverse, page, pageSize);
      setPageCount(result.pages);
      if (page === 1) {
        // Заміна даних при завантаженні першої сторінки
        setImages(result.items);
      } else {
        // Додавання нових даних до поточних при завантаженні наступних сторінок
        setImages(prevImages => [...prevImages, ...result.items]);
      }
      setLoadingState('success');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [getAllPhotoPage, reverse, page, pageSize]);

  const changePage = () => {
    if (page < pageCount) {
      setPage(prevPage => prevPage + 1);
    } else {
      setPage(1);
    }
  };

  const toggleSorting = async () => {
    try {
      setImages([]);
      setReverse(!reverse);
      setPage(1);
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {images?.length > 0 && (
        <button
          className={styles.sort}
          onClick={() => {
            toggleSorting();
          }}
        >
          <SortIcon />
          {!reverse
            ? 'Сортування від старіших до новіших'
            : 'Сортування від новіших до старіших'}
        </button>
      )}
      <div className={styles.gallery}>
        {Array.isArray(images) &&
          images.length > 0 &&
          images.map((image, index) => (
            <div key={image.id} className={styles.item}>
              <img
                loading="lazy"
                src={image.media}
                alt={
                  image.description
                    ? image.description
                    : `КДШМ М.І.Вериківського фото ${index + 1}`
                }
                onClick={() => {
                  setActiveImgUrl(image.id);
                  setIsModalOpen(!isModalOpen);
                }}
              />
            </div>
          ))}
        {loadingState === 'loading' && <Spinner />}
      </div>
      <button
        className={`${styles.showMore} ${
          page < pageCount ? '' : styles.noMore
        }`}
        onClick={changePage}
      >
        {page < pageCount ? 'Дивитися більше' : 'Дивитися менше'}
        <ArrowIcon />
      </button>
      {isModalOpen && (
        <Suspense>
          <Modal
            isModalOpen={isModalOpen}
            closeModal={setIsModalOpen}
            accentIcon={true}
          >
            <img
              src={selectedImg.media}
              alt={` ${
                selectedImg.description
                  ? selectedImg.description
                  : 'КДШМ М.І.Вериківського фото'
              }`}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default GalleryImages;
