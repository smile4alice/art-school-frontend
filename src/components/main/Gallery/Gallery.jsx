import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/NavLinkButton/NavLinkButton';
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
      <section className={styles.Gallery}>
        <div className={styles.galleryHeading}>
          <h1>Галерея</h1>
        </div>
        <div className={styles.ButtonContainer}>
          <NavLinkButton title={'Переглянути всі фото'} href={'/'} />
        </div>
        <div className={styles.gallery}>
          {images.map((image, index) => (
            <div
              key={`item${index + 1}`}
              className={styles.item}
            >
              <img src={image} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Gallery;
