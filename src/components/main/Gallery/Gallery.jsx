import Container from '../../Container/Container';
import styles from './Gallery.module.scss';

const images = [
  'images/gallery/gallery-img-1.jpg',
  'images/gallery/gallery-img-2.jpg',
  'images/gallery/gallery-img-3.jpg',
  'images/gallery/gallery-img-4.jpg',
  'images/gallery/gallery-img-5.jpg',
  'images/gallery/gallery-img-6.jpg',
  'images/gallery/gallery-img-7.jpg',
];

const Gallery = () => {
  return (
    <Container>
      <div className={styles.galleryHeader}>
        <div className={styles.galleryHeading}>Галерея</div>
        <button className={styles.galleryButton} >дивитись всі фото</button>
      </div>

      <div className={styles.gallery}>
        {images.map((image, index) => (
          <div key={`item${index + 1}`} className={styles[`item${index + 1}`]}>
            <img src={image} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Gallery;
