import { Link } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import styles from './NewsTable.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';

const NewsTable = ({ data }) => {
  const { deletePost } = useNewsStore();

  const subString = str => {
    return str.split(' ').slice(0, 8).join(' ');
  };

  const removePost = async id => {
    try {
      await deletePost(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.contentWrap}>
      <ul className={styles.tableHeader}>
        <li className={styles.cellSlideyHeader}>Новини</li>
        <li className={styles.cellHeadingHeader}>Заголовок</li>
        <li className={styles.cellTextHeader}>Текст</li>
        <li className={styles.cellPhotoHeader}>Фото</li>
        <li className={styles.cellActionHeader}>Дія</li>
      </ul>
      {data.map((item, index) => (
        <div className={styles.tableRow} key={index}>
          <div className={styles.cellSliderRow}>{index + 1}</div>
          <div className={styles.cellHeadingRow}>{item.title}</div>
          <div className={styles.cellTextRow}>{subString(item.text)}</div>
          <div className={styles.cellPhotoRow}>
            <img
              src={item.photo}
              alt="Фото"
              className={styles.contentElementImg}
            />
          </div>
          <div className={styles.cellActionRow}>
            <Link to={`edit/${item.id}`}>
              <div className={styles.cellActionContainer}>
                <svg className={styles.iconEdit}>
                  <use href={`${sprite}#icon-edit`} width="20" height="20" />
                </svg>
              </div>
            </Link>

            <button
              onClick={() => removePost(item.id)}
              className={styles.cellActionContainer}
            >
              <svg className={styles.iconTrash}>
                <use href={`${sprite}#icon-trash`} width="20" height="20" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default NewsTable;
