import arrowIcon from '../../../assets/icons/bottom-arrow.svg';
import { useState } from 'react';
import s from './DropDown.module.scss';

const DropDown =({subDep}) => {
  const [isOpen, setOpen] = useState(false);
  console.log(subDep);
  console.log(subDep.sub_department_name);
  return (
    <div className={s.dropdown}>
      <div className={s.dropdownHead}>
        <p className={s.dropdownName}>{subDep.sub_department_name}</p>
        <button onClick={() => setOpen(!isOpen)}>
          <img src={arrowIcon} />
        </button>
      </div>
      {isOpen && <p className={s.dropdownContent}>{subDep.description}</p>}
    </div>
  );
};

export default DropDown;
