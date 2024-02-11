import { useState, useEffect, lazy, Suspense } from 'react';
import useServicesStore from '@/store/serviseStore';
import Spinner from '@/components/ui/Spinner/Spinner';
import { useModal } from '@/store/modalStore';
import SortIcon from '@/components/Icons/SortIcon';
import ArrowIcon from '@/components/Icons/Arrow/Arrow';
import styles from './GalleryImages.module.scss';
const Modal = lazy(() => import('@/components/ui/Modal/Modal'));
const GalleryImages = () => {
  const { isModalOpen, openModal } = useModal();
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
          {reverse
            ? ' Сортування від новіших до старіших'
            : ' Сортування від старіших до новіших'}
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
                alt={`Image ${index + 1}`}
                onClick={() => {
                  setActiveImgUrl(image.id);
                  openModal();
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
          <Modal accentIcon={true}>
            <img
              src={selectedImg.media}
              alt={`Галерея ${selectedImg.description}`}
            />
          </Modal>
        </Suspense>
      )}
    </>
  );
};

export default GalleryImages;
