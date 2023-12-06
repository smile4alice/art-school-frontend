import styles from "./SlidersTable.module.scss";
import sprite from '../../../../assets/icons/sprite-admin.svg';

const SlidersTable = () => {
   return (
      <div className={styles.contentWrap}>
         <ul className={styles.tableHeader}>
            <li className={styles.cellSlideyHeader}>
               Слайди
            </li>
            <li className={styles.cellHeadingHeader}>
               Заголовок
            </li>
            <li className={styles.cellTextHeader}>
               Текст
            </li>
            <li className={styles.cellPhotoHeader}>
               Фото
            </li>
            <li className={styles.cellActionHeader}>
               Дія
            </li>
         </ul>  
          <div className={styles.tableRow}>
            <div className={styles.cellSliderRow}>
               1
            </div>
            <div className={styles.cellHeadingRow}>
               Tabile modern school
            </div>
            <div className={styles.cellTextRow}>
               Tabile modern school проводить набір дітей за напрямком сучасний танець (модерн танець, контемпорарі), до 1-го класу 6-7 років та 8-9 років до 2-го кла
            </div>
            <div className={styles.cellPhotoRow}>
               <img
                  src="#"
                  alt="Фото"
                  className={styles.contentElementImg}>                  
            </img>
            </div>
            <div className={styles.cellActionRow}>
               <div className={styles.cellActionContainer}>
                  <svg className={styles.iconEdit}>
                     <use href={`${sprite}#icon-edit`} width="20" height="20" />
                  </svg>
               </div>
               <div className={styles.cellActionContainer}>
                  <svg className={styles.iconTrash}>
                     <use href={`${sprite}#icon-trash`} width="20" height="20" />
                  </svg>
               </div>
            </div>
         </div>         
     </div>
)
}
export default SlidersTable;