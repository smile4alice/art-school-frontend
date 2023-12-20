import { useState, useEffect, useRef } from 'react';
import useServicesStore from '@/store/serviseStore';
import { useClickOutside } from '@/hooks/hooks';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import s from './SelectAdminDouble.module.scss';

const SelectAdminDouble = ({ changeDepartment }) => {
  const { getMainDepartments, getSubDepartments } = useServicesStore();
  const [mainDepartmentsList, setMainDepartmentsList] = useState([]);
  const [subDepartmentsList, setSubDepartmentsList] = useState([]);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [secondOptionsVisible, setSecondOptionsVisible] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState('');
  const [loadingState, setLoadingState] = useState('loading');
  //видимість основного select
  const toggleOptionsVisible = () => {
    setOptionsVisible(!optionsVisible);
  };
  //видимість додаткового select
  const toggleSecondOptionsVisible = optionId => {
    setSecondOptionsVisible(!secondOptionsVisible);
    setSelectedOptionId(prevId => (prevId === optionId ? '' : optionId));
  };
  //закривання select при кліку поза компонентом
  const selectRef = useRef(null);
  const selectOptionsRef = useRef(null);
  useClickOutside([selectRef, selectOptionsRef], () => {
    if (optionsVisible === true) {
      toggleOptionsVisible();
      toggleSecondOptionsVisible();
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMainDepartments();
        setMainDepartmentsList(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, [getMainDepartments]);

  useEffect(() => {
    if (secondOptionsVisible) {
      const fetchData = async () => {
        setLoadingState('loading');
        try {
          const result = await getSubDepartments(selectedOptionId);
          setSubDepartmentsList(result);
          setLoadingState('success');
        } catch (error) {
          console.error('Error:', error);
          setLoadingState('error');
        }
      };
      fetchData();
    }
  }, [selectedOptionId, getSubDepartments, secondOptionsVisible]);

  return (
    <div className={s.selectContainer}>
      <div
        className={`${s.selectButton} ${optionsVisible ? s.active : ''}`}
        onClick={toggleOptionsVisible}
        ref={selectRef}
      >
        <span>Виберіть відділ</span>
        <img className={s.arrow} src="/icons/arrow.svg" alt="arrow icon" />
      </div>
      {optionsVisible && (
        <div className={s.optionsContainer} ref={selectOptionsRef}>
          {mainDepartmentsList.map(option => (
            <div
              key={option.id}
              className={`${s.option} ${
                selectedOptionId === option.id ? s.active : ''
              }`}
              onClick={() => {
                toggleSecondOptionsVisible(option.id);
              }}
            >
              <div className={s.button}> {option.department_name} <img className={s.arrow} src="/icons/arrow.svg" alt="arrow icon" /></div>
             
              {selectedOptionId === option.id &&
                (loadingState !== 'loading' ? (
                  <div className={s.secondOptionsContainer}>
                    {subDepartmentsList.map(item => (
                      <div
                        key={item.id}
                        className={s.secondOption}
                        onClick={() => {
                          changeDepartment(item.id, item.sub_department_name); //встановлюємо id для запиту
                          toggleOptionsVisible();
                        }}
                      >
                        <div className={s.button}>{item.sub_department_name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <SpinnerAdmin />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectAdminDouble;
