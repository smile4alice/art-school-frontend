import Container from '@/components/Container/Container';
import NavLinkButton from '@/components/ui/Buttons/NavLinkButton';
import { images } from '@/constants/gallery';
import styles from './Gallery.module.scss';

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
          {images.slice(0, 7).map((image, index) => (
            <div key={image.date} className={styles.item}>
              <img src={image.url} alt={`Image ${index + 1}`} />
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Gallery;
