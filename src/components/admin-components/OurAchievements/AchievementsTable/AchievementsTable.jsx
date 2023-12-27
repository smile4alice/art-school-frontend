import { useState, useEffect, useRef } from 'react';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import AchievementsTableRow from './AchievementsTableRow';
import s from './AchievementsTable.module.scss';
import axios from '@/utils/axios';

const AchievementsTable = ({ typeOfAchievements, url }) => {
  const { deleteAchievement } = useServicesStore;
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [achievements, setAchievements] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef();


  const loadMoreData = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const nextPage = page + 1;
        const response = await axios.get(`${url}?page=${nextPage}`);
        //return response
        const newData = response.data; // Припустимо, що дані приходять у вигляді масиву

        if (newData?.length > 0) {
          setAchievements((prevData) => [...prevData, ...newData]);
          setPage(nextPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(()=>{
    loadMoreData()
  },[])


  

  useEffect(() => {
    const tableObserver = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Дозавантаження нових даних при досягненні останнього рядка
          loadMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (tableRef.current) {
      tableObserver.observe(tableRef.current);
    }

    // При видаленні компонента зупиняємо спостереження
    return () => tableObserver.disconnect();
  }, [tableRef]);


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
    <div className={s.table}>
      <div className={`${s.row} ${s.thead}`}>
        {typeOfAchievements === 'mainAchievements' && (
          <div className={s.num}>Слайди</div>
        )}
        <div className={s.description}>Опис</div>
        <div className={s.photo}>Фото</div>
        <div className={s.action}>Дія</div>
      </div>
      <div className={s.tbody} ref={tableRef}>
        {Array.isArray(achievements) &&
          achievements.length > 0 &&
          achievements.map((item, index) => (
            <AchievementsTableRow
              typeOfAchievements={typeOfAchievements}
              setCurrentId={setCurrentId}
              openModal={openModal}
              item={item}
              index={index}
              key={index}
            />
          ))}
        {loading && <p>Loading...</p>}
      </div>
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};

export default AchievementsTable;

/*
import { useState, useEffect, useRef } from 'react';
import useServicesStore from '@/store/serviseStore';
import { useModal } from '@/store/modalStore';
import { useConfirmDelete } from '@/store/confirmDelete';
import ConfirmDeleteModal from '@/components/admin-components/modals/ConfirmDeleteModal/ConfirmDeleteModal';
import AchievementsTableRow from './AchievementsTableRow';
import s from './AchievementsTable.module.scss';
import axios from '@/utils/axios';

const AchievementsTable = ({ typeOfAchievements, url }) => {
  const { deleteAchievement } = useServicesStore;
  const { isDeleteConfirm } = useConfirmDelete();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [achievements, setAchievements] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef();


  const loadMoreData = async () => {
    if (!loading) {
      try {
        setLoading(true);
        const nextPage = page + 1;
        const response = await axios.get(`${url}?page=${nextPage}`);
        //return response
        const newData = response.data; // Припустимо, що дані приходять у вигляді масиву

        if (newData?.length > 0) {
          setAchievements((prevData) => [...prevData, ...newData]);
          setPage(nextPage);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(()=>{
    loadMoreData()
  },[])


  

  useEffect(() => {
    const tableObserver = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          // Дозавантаження нових даних при досягненні останнього рядка
          loadMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (tableRef.current) {
      tableObserver.observe(tableRef.current);
    }

    // При видаленні компонента зупиняємо спостереження
    return () => tableObserver.disconnect();
  }, [tableRef]);


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
    <div className={s.table}>
      <div className={`${s.row} ${s.thead}`}>
        {typeOfAchievements === 'mainAchievements' && (
          <div className={s.num}>Слайди</div>
        )}
        <div className={s.description}>Опис</div>
        <div className={s.photo}>Фото</div>
        <div className={s.action}>Дія</div>
      </div>
      <div className={s.tbody} ref={tableRef}>
        {Array.isArray(achievements) &&
          achievements.length > 0 &&
          achievements.map((item, index) => (
            <AchievementsTableRow
              typeOfAchievements={typeOfAchievements}
              setCurrentId={setCurrentId}
              openModal={openModal}
              item={item}
              index={index}
              key={index}
            />
          ))}
        {loading && <p>Loading...</p>}
      </div>
      {isModalOpen && <ConfirmDeleteModal handleDelete={removePost} />}
    </div>
  );
};

export default AchievementsTable;
*/