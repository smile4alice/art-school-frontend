import styles from './DepartmentDesctiption.module.scss';
const DepartmentDesctiption = ({ departmentInfo }) => {
  return (
    <ul className={styles.desctiption_list}>
      {departmentInfo.map(item => (
        <li className={styles.desctiption_list_listItem} key={item.id}>
          <div className={styles.desctiption_list_listItem_content}>
            <p className={styles.desctiption_list_listItem_content_text}>
              {item.description}
            </p>
            <img
              className={styles.desctiption_list_listItem_content_img}
              src={item.media}
              alt=""
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DepartmentDesctiption;
