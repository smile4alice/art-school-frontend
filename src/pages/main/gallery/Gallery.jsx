import { useEffect } from 'react';
import Container from '@/components/Container/Container';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import YoutubeLink from '@/components/gallery_page/YoutubeLink/YoutubeLink';
import GalleryVideo from '@/components/gallery_page/GalleryVideo/GalleryVideo';
import GalleryImages from '@/components/gallery_page/GalleryImages/GalleryImages';
import styles from './Gallery.module.scss';
import SEO from '@/components/SEO';

const Gallery = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO
        title="Галерея КДШМ №2 ім. М.І.Вериківського"
        description="Детальніше дізнатись про те чим живе школа та переглянути як пройшов мистецький захід можна на сторінці Галерея КДШМ №2 ім. М.І.Вериківського."
      />
      <Container>
        <section className={styles.Gallery}>
          <PageTitle title="Галерея" />
          <YoutubeLink />
          <GalleryVideo/>    
          <GalleryImages/>     
        </section>
      </Container>
    </>
  );
};

export default Gallery;
