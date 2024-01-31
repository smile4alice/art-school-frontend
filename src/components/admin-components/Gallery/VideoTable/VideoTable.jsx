import { useState } from 'react';
import { Link } from 'react-router-dom';
import useVideoStore from '@/store/videoStore';
import { useModal } from '@/store/modalStore';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import sprite from '@/assets/icons/sprite-admin.svg';
import s from './VideoTable.module.scss';

const VideoTable = ({ videos }) => {
  const { deleteVideo } = useVideoStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');

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

  return (
    <div className={s.galleryTable}>
      <div className={s.videos}>
        {videos?.length > 0 &&
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
        {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
      </div>
    </div>
  );
};

export default VideoTable;
