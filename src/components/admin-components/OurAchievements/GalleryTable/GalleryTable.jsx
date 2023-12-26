import { useState } from 'react';
import { Link } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import s from './GalleryTable.module.scss';

const GalleryTable = ({ url, data, typeOfAchievements }) => {
  const { deleteAchievement } = useServicesStore();
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [currentId, setCurrentId] = useState('');

  const removePost = async () => {
    if (isDeleteConfirm) {
      try {
        await deleteAchievement(url, currentId);
      } catch (error) {
        console.log(error);
      }
    } else {
      closeModal();
    }
  };

  return (
    <div className={s.galleryTable}>
      <div className={s.gallary}>
        {data?.length > 0 &&
          data.map((item, i) => (
            <div className={s.photoContainer} key={i}>
              <div className={s.photo}>
                <div>
                  <img src={item.media} alt="Фото" />
                </div>
              </div>
              <div className={s.action}>
                {typeOfAchievements === 'mainAchievements' && (
                  <div className={s.count}>{item.pinned_position}</div>
                )}
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
    </div>
  );
};

export default GalleryTable;
