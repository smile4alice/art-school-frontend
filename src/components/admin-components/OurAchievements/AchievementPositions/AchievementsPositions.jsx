import { useEffect } from 'react';
import s from './AchievementPositions.module.scss';

const AchievementPositions = ({ data, title, selectedPosition, onPositionChange }) => {
  useEffect(() => {
    console.log(selectedPosition);
  }, [ selectedPosition]);

  const renderRadios = () => {
    const radios = [];

    for (let i = 1; i <= 12; i++) {
      const isTaken = data?.taken_positions?.includes(i) || false;
      const isActive = selectedPosition == i;
      const inputClassName = isTaken
        ? s.taken
        : isActive
        ? `${s.input} ${s.active}`
        : s.free;
       // console.log(`Position: ${i}, isActive: ${isActive}, isTaken: ${isTaken}`);

      radios.push(
        <div key={i} className={s.radioContainer}>
          <label htmlFor={`radio-${i}`} className={s.label}>
            Фото{i}
          </label>
          <input
            className={inputClassName}
            type="radio"
            id={`radio-${i}`}
            name="position"
            disabled={isTaken}
            checked={isActive}
            onChange={() => onPositionChange(i)}
          />
        </div>
      );
    }

    return radios;
  };

  return (
    <div className={s.container}>
      <h4 className={s.title}>{title}</h4>
      <div className={s.radioList}>{renderRadios()}</div>
    </div>
  );
};

export default AchievementPositions;

/*
import { useEffect } from 'react';
import s from './AchievementPositions.module.scss';

const AchievementPositions = ({ data, title, formik }) => {
  useEffect(() => {
    // Тут можна використовувати значення formik.values.pinned_position
    console.log(formik.values.pinned_position);
  }, [formik.values.pinned_position]);

  const renderRadios = () => {
    const radios = [];
  
    for (let i = 1; i <= 12; i++) {
      const isTaken = data?.taken_positions?.includes(i) || false;
      const isActive = formik.values.pinned_position === i;
      const inputClassName = isTaken ? s.taken : isActive ? `${s.input} ${s.active}` : s.free;
  
      radios.push(
        <div key={i} className={s.radioContainer}>
          <label htmlFor={`radio-${i}`} className={s.label}>
            Фото {i}
          </label>
          <input
            className={inputClassName}
            type="radio"
            id={`radio-${i}`}
            name="position"
            disabled={isTaken}
            checked={isActive}
            onChange={() => formik.setFieldValue('pinned_position', i)}
          />
        </div>
      );
    }
  
    return radios;
  };

  return (
    <div className={s.container}>
      <h4 className={s.title}>{title}</h4>
      <div className={s.radioList}>{renderRadios()}</div>
    </div>
  );
};

export default AchievementPositions;
*/