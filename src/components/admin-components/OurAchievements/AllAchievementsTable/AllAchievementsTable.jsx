import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import sprite from '@/assets/icons/sprite-admin.svg';
import s from './AchievementsTable.module.scss';

const AllAchievementsTable = ({ data, typeOfAchievements, url }) => {
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

  const { getAllAchievements, getMainAchievements, getDepartmentAchievements } = useServicesStore();


  const [page, setPage] = useState(1);

  const triggerRef = useRef(null);//тригер коли зявитьься на екрані виконається функція

  useEffect(()=>{

    const observer = new IntersectionObserver((entries) => {

    }, {})
    // якщо є triggerRef.current 
    if(triggerRef.current){
      observer.observe(triggerRef.current)
    }

    return () => {
      if(triggerRef.current){
        observer.unobserve();
      }
    }
  },[])


  return (
    <div className={s.table}>
      <div className={`${s.row} ${s.thead}`}>
        {typeOfAchievements === 'mainAchievements' && (
          <div className={s.num}>Слайди</div>
        )}
        <div className={s.description}>Опис</div>
        <div className={s.photo}>Фото</div>
        <div className={s.action}>Дія</div>
      </div>
      <div className={s.tbody}>
        {data?.length > 0 &&
          data.map((item, index) => (
            <div className={s.row} key={index}>
              {typeOfAchievements === 'mainAchievements' && (
                <div className={s.num}>{index + 1}</div>
              )}
              <div className={s.description}>{item.description}</div>
              <div className={s.photo}>
                <div>
                  <img src={item.media} alt="Фото" />
                </div>
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
                  <svg>
                    <use href={`${sprite}#icon-trash`} />
                  </svg>
                </button>
              </div>
            </div>
          ))}
          <div className={s.trigger} ref={triggerRef}></div>
      </div>
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};

export default AllAchievementsTable;
