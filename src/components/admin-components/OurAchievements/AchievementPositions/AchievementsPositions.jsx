import { useEffect, useState } from 'react';
import s from './AchievementPositions.module.scss';

const AchievementPositions = ({ data, title }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  useEffect(() => {
    // Тут можна використовувати значення selectedPosition
    console.log(selectedPosition);
  }, [selectedPosition]);

  const renderRadios = () => {
    const radios = [];
    for (let i = 1; i <= 12; i++) {
      const isTaken = data?.taken_positions?.includes(i) || false;
      //const isFree = data?.free_positions?.includes(i) || false;
      const style = {
        borderColor: isTaken ? 'blue' : 'blue',
        borderWidth: isTaken ? '3px' : '1px',
      };

      radios.push(
        <div key={i} className={s.radioContainer}>
            <label htmlFor={`radio-${i}`} style={style}>Фото{i}</label>
          <input
            type="radio"
            id={`radio-${i}`}
            name="position"
            disabled={isTaken}
            checked={selectedPosition === i}
            onChange={() => setSelectedPosition(i)}
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
