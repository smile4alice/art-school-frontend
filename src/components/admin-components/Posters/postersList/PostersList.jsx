import { Link } from 'react-router-dom';
import styles from './PostersList.module.scss';
import sprite from '@/assets/icons/sprite-admin.svg';

const PostersList = ({ data }) => {
  // const subString = str => {
  //   return str.split(' ').slice(0, 8).join(' ');
  // };

  return (
    <div className={styles.contentWrap}>
      <div className={styles.tableHeader}>
        {/* <li className={styles.cellSlideyHeader}>Новини</li> */}
        <p className={styles.cellHeadingHeader}>Заголовок</p>
        <div className={styles.cellActionWrapper}>
          <p className={styles.cellPhotoHeader}>Фото</p>
          <p className={styles.cellActionHeader}>Дія</p>
        </div>
      </div>
      {data.map((item, index) => (
        <div className={styles.tableRow} key={index}>
          <div className={styles.cellTextWrapper}>
            <div className={styles.cellSliderRow}>{index + 1}</div>
            <div className={styles.cellHeadingRow}>{item.title}</div>

            {/* <div className={styles.cellTextRow}>{subString(item.text)}</div> */}
          </div>

          <div className={styles.cellPosterWrapper}>
            <div className={styles.cellPhotoRow}>
              <img
                src={item.photo}
                alt="Фото"
                className={styles.contentElementImg}
              />
            </div>
            <div className={styles.cellActionRow}></div>

            <div className={styles.cellActionContainer}>
              <Link to={`edit/${item.id}`}>
                <svg className={styles.iconEdit}>
                  <use href={`${sprite}#icon-edit`} width="20" height="20" />
                </svg>
              </Link>
            </div>
            <div className={styles.cellActionContainer}>
              <svg className={styles.iconTrash}>
                <use href={`${sprite}#icon-trash`} width="20" height="20" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostersList;
