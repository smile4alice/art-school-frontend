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
        await getAllImages();
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideo();
  }, [getAllVideo, getAllImages]);

  return (
    <>
      <SEO
        title="Галерея Київської дитячої школи мистецтв №2 ім. М.І.Вериківського"
        description="Київська дитяча школа мистецтв №2 ім. М.І.Вериківського є осередком, де виховуються таланти, вирує мистецьке життя, та відбуваються різні мистецькі заходи. Детальніше дізнатись про те чим живе школа та переглянути як пройшов мистецький захід можна на сторінці Галерея дитячої школи мистецтв. "
      />
      <Container>
        <section className={styles.Gallery}>
          <PageTitle title="Галерея" />
          <YoutubeLink />
          {videoLoading || imageLoading ? (
            <Spinner />
          ) : (
            <>
              {videos?.length > 0 || images?.length > 0 ? (
                <>
                  <GalleryVideo videos={videos} />
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
