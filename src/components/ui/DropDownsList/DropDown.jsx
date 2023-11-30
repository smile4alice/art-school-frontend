import arrowIcon from '../../../assets/icons/bottom-arrow.svg';
import { useState } from 'react';
import s from './DropDown.module.scss';

const DropDown = subDep => {
  const [isOpen, setOpen] = useState(false);
  console.log(subDep);
  return (
    <div className={s.dropdown}>
      <div className={s.dropdownHead}>
        <div className={s.dropdownName}>{subDep.sub_department_name}</div>
        <button onClick={() => setOpen(!isOpen)}>
          <img src={arrowIcon} />
        </button>
      </div>
      {isOpen && <div className={s.dropdownContent}>{subDep.description}</div>}
    </div>
  );
};

export default DropDown;
