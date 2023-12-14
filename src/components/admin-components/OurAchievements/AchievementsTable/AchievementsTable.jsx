import s from './AchievementsTable.module.scss';

const AchievementsTable = ({ data, typeOfAchievements }) => {
  console.log(data);

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
        {data.length > 0 &&
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
                <button className={s.edit}>
                  <img src="/icons/edit.svg" alt="edit icon" />
                </button>
                <button className={s.delete}>
                  <img src="/icons/delete.svg" alt="delete icon" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AchievementsTable;
