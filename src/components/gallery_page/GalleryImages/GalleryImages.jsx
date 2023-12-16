import { useState, useEffect } from 'react';
import SortIcon from '@/components/Icons/SortIcon';
import ViewButton from '@/components/ui/Buttons/ViewButton/ViewButton';

import styles from './GalleryImages.module.scss';

const GalleryImages = ({ images }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(14);
  const [sorting, setSorting] = useState(false);
  const [sortedImages, setSortedImages] = useState(images);
  const isMaxAmount = itemsPerPage >= images?.length;

  const viewMore = () => {
    if (!isMaxAmount) {
      setItemsPerPage(prev => prev + 14);
    }
  };

  const viewLess = () => {
    setItemsPerPage(14);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (sorting) {
      setSortedImages(images.sort((a, b) => b.date - a.date));
    } else {
      setSortedImages(images.sort((a, b) => a.date - b.date));
    }
  }, [setSortedImages, sorting, images]);

  return (
    <>
      <div className={styles.sort}>
        <button onClick={() => setSorting(!sorting)}>
          <SortIcon />
          {!sorting
            ? ' Сортування від новіших до старіших'
            : ' Сортування від старіших до новіших'}
        </button>
      </div>
      <div className={styles.gallery}>
        {sortedImages &&
          Array.isArray(sortedImages) &&
          sortedImages.slice(0, itemsPerPage).map((image, index) => (
            <div key={image.date} className={styles.item}>
              <img src={image.url} alt={`Image ${index + 1}`} />
            </div>
          ))}
      </div>
      <ViewButton
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        isMaxAmount={isMaxAmount}
        viewMore={viewMore}
        viewLess={viewLess}
      />
    </>
  );
};

export default GalleryImages;
