import { useEffect } from 'react';
import Container from '@/components/Container/Container';
import GalleryVideo from '../../../components/gallery_page/GalleryVideo/GalleryVideo';
import YoutubeLink from '../../../components/gallery_page/YoutubeLink/YoutubeLink';
import GalleryImages from '../../../components/gallery_page/GalleryImages/GalleryImages';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import { images, videos } from '@/data/gallery.json';
import styles from './Gallery.module.scss';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <section className={styles.Gallery}>
        <PageTitle title="Галерея" />
        <YoutubeLink />
        <GalleryVideo videos={videos} />
        <GalleryImages images={images} />
      </section>
    </Container>
  );
};

export default Gallery;
