import DropDown from './DropDown';
import useServicesStore from '@/store/serviseStore';
import { useState } from 'react';

const DropDownsList = () => {
  const subDepartments = useServicesStore(state => state.subDepartments);
  const [selectedSubDepId, setSelectedSubDepId] = useState(null);
  const handleDropDownClick = subDepId => {
    setSelectedSubDepId(prevId => (prevId === subDepId ? null : subDepId));
  };
  return (
    <section className="section">
      {subDepartments?.map(subDep => (
        <DropDown
          key={subDep.id}
          subDep={subDep}
          isOpen={selectedSubDepId === subDep.id}
          onDropDownClick={() => handleDropDownClick(subDep.id)}
        />
      ))}
    </section>
  );
};

export default DropDownsList;
