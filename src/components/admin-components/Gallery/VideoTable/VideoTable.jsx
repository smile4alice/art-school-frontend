import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/ui/ConfirmDeleteModal/ConfirmDeleteModal';
import s from './VideoTable.module.scss';

const VideoTable = ({ url, videos }) => {
  const navigate = useNavigate();
  const { deleteAchievement } = useServicesStore();
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');
  const replaceUrl = videoUrl => {
    return videoUrl.replace('watch?v=', 'embed/');
  };

  useEffect(() => {}, [videos, currentId]);
  const removePost = async () => {
    if (isDeleteConfirm) {
      try {
        console.log(currentId);
        await deleteAchievement(url, currentId);
        navigate(`/admin/${url}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      closeModal();
    }
  };

  return (
    <div className={s.galleryTable}>
      {videos?.length > 0 &&
        videos.map((item, i) => (
          <div className={s.photoContainer} key={i}>
            <div className={s.photo}>
              <iframe
                src={replaceUrl(item.media)}
                title={`Video ${i + 1}`}
                width="250"
                height="150"
              ></iframe>
            </div>
            <div className={s.action}>
              <Link to={`edit/${item.id}`}>
                <button className={s.edit}>
                  <img src="/icons/edit.svg" alt="edit icon" />
                </button>
              </Link>
              <button
                className={s.delete}
                onClick={() => {
                  setCurrentId(item.id);
                  openModal();
                  
                }}
              >
                <img src="/icons/delete.svg" alt="delete icon" />
              </button>
            </div>
          </div>
        ))}
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};

export default VideoTable;
