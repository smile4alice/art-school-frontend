import { useState, useEffect } from 'react';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
//import useVideoStore from '@/store/videoStore';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import VideoTable from '@/components/admin-components/Gallery/VideoTable/VideoTable';
import s from './VideoPage.module.scss';
const videos = [
  { media: 'https://www.youtube.com/watch?v=wfe30X9jkQI', id:'1' },
  { media: 'https://www.youtube.com/watch?v=jdCu1JDLLQU', id:'2' },
  { media: 'https://www.youtube.com/watch?v=wfe30X9jkQI', id:'3' },
  { media: 'https://www.youtube.com/watch?v=j-Ifvim9bHE', id:'4' },
  { media: 'https://www.youtube.com/watch?v=wfe30X9jkQI', id:'5' },
  { media:  'https://www.youtube.com/watch?v=twsX3imm6mo', id:'6' },
];

const breadcrumbs = ['Відеогалерея'];

const VideoPageAdmin = () => {
// const { getAllVideo } = useVideoStore();
  const [videoData, setVideoData] = useState(videos);
  const [loadingState, setLoadingState] = useState('success');
/*
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingState('loading');
        const result = await getAllVideo();
        setVideoData(result);
        setLoadingState('success');
      } catch (error) {
        console.error(error);
        setLoadingState('error');
      }
    };
    fetchData();
  }, [getAllVideo]);

*/
  return (
    <div className={s.container}>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Відеогалерея"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/video/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати відео"
      />
      {loadingState === 'success' && videoData?.length > 0 && (
        <VideoTable videos={videoData} url="video" />
      )}
      {loadingState === 'loading' && (
        <div className={s.errorData}>
          <SpinnerAdmin />
        </div>
      )}
      {loadingState === 'error' && <PlaceholderAdmin />}
    </div>
  );
};

export default VideoPageAdmin;
