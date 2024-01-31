import { useEffect } from 'react';
import useVideoStore from '@/store/videoStore';
import useGalleryStore from '@/store/galleryStore';
import Container from '@/components/Container/Container';
import GalleryVideo from '@/components/gallery_page/GalleryVideo/GalleryVideo';
import YoutubeLink from '@/components/gallery_page/YoutubeLink/YoutubeLink';
import GalleryImages from '@/components/gallery_page/GalleryImages/GalleryImages';
import PageTitle from '@/components/ui/PageTitle/PageTitle';
import Spinner from '@/components/ui/Spinner/Spinner';
import styles from './Gallery.module.scss';
import Placeholder from '@/components/ui/Placeholder/Placeholder';
import SEO from '@/components/SEO';

const Gallery = () => {
  const { getAllVideo } = useVideoStore();
  const { getAllImages } = useGalleryStore();
  const videos = useVideoStore(state => state.videos);
  const images = useGalleryStore(state => state.images);
  const videoLoading = useVideoStore(state => state.loading);
  const imageLoading = useGalleryStore(state => state.loading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        await getAllVideo();
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [getAllVideo]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        await getAllImages();
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [getAllImages]);

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
          {videoLoading || imageLoading ? (
            <Spinner />
          ) : (
            <>
              {videos?.length > 0 ? (
                <>
                  <GalleryVideo videos={videos} />
                </>
              ) : (
                <Placeholder />
              )}
              {images?.length > 0 ? (
                <>
                  <GalleryImages images={images} />
                </>
              ) : (
                <Placeholder />
              )}
            </>
          )}
        </section>
      </Container>
    </>
  );
};

export default Gallery;
