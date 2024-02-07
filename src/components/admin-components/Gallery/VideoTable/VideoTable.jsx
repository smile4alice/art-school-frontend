import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useVideoStore from '@/store/videoStore';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '../../PlaceholderAdmin/PlaceholderAdmin';
import { useModal } from '@/store/modalStore';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import sprite from '@/assets/icons/sprite-admin.svg';
import s from './VideoTable.module.scss';

const VideoTable = ({ typeOfAchievements, departmentId }) => {
  const { deleteVideo, getAllVideo, getMainVideo, getDepartmentVideo } =
    useVideoStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');
  const videos = useVideoStore(state => state.videos);
  const pageCount = useVideoStore(state => state.videoPageCount);
  const loading = useVideoStore(state => state.loading);
  const [page, setPage] = useState(1);
  const triggerRef = useRef(null);
  const replaceUrl = videoUrl => {
    return videoUrl.replace('watch?v=', 'embed/');
  };

  const removePost = async () => {
    try {
      closeModal();
      await deleteVideo(currentId);
    } catch (error) {
      console.log(error);
      closeModal();
    } finally {
      closeModal();
    }
  };

  const fetchData = async () => {
    try {
      if (typeOfAchievements === 'allAchievements') {
        await getAllVideo(page);
      } else if (typeOfAchievements === 'mainAchievements') {
        await getMainVideo();
        setPage(1);
      } else if (typeOfAchievements === 'departmentAchievements') {
        await getDepartmentVideo(departmentId);
        setPage(1);
      }
    } catch (error) {
      console.log(error);
      setPage(1);
    }
  };

  // Використовуємо IntersectionObserver для визначення, коли елемент потрапив у зону видимості
  useEffect(() => {
    if (typeOfAchievements === 'allAchievements') {
      const observer = new IntersectionObserver(entries => {
        const isIntersecting = entries[0]?.isIntersecting;
        const canLoadMore = loading === 'success' && page < pageCount;
        if (isIntersecting && canLoadMore) {
          setPage(prevPage => prevPage + 1);
        }
      }, {});
      const triggerElement = triggerRef.current;
      if (triggerElement) {
        observer.observe(triggerElement);
      }
      return () => {
        if (triggerElement) {
          observer.unobserve(triggerElement);
        }
      };
    }
    //eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    fetchData();
    //eslint-disable-next-line
  }, [page, typeOfAchievements, departmentId]);

  return (
    <div className={s.galleryTable}>
      <div className={s.videos}>
        {Array.isArray(videos) &&
          videos?.length > 0 &&
          videos.map((item, i) => (
            <div className={s.photoContainer} key={i}>
              <div className={s.photo}>
                <iframe
                  src={replaceUrl(item.media)}
                  title={`Video ${i + 1}`}
                  width="100%"
                  height="95"
                />
              </div>
              <div className={s.action}>
                {item.pinned_position && (
                  <div className={s.count}>{item.pinned_position}</div>
                )}
                <Link to={`edit/${item.id}`}>
                  <button className={s.edit}>
                    <svg>
                      <use href={`${sprite}#icon-edit`} />
                    </svg>
                  </button>
                </Link>
                <button
                  className={s.delete}
                  onClick={() => {
                    setCurrentId(item.id);
                    openModal();
                  }}
                >
                  <svg onClick={() => setCurrentId(item.id)}>
                    <use href={`${sprite}#icon-trash`} />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        {loading === 'loading' && <SpinnerAdmin />}
        <div className={s.trigger} ref={triggerRef}></div>
        {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
      </div>
      {loading === 'error' && <PlaceholderAdmin />}
    </div>
  );
};

export default VideoTable;
