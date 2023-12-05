// DropDownsList.jsx
import DropDown from './DropDown';
import { useState, useEffect } from 'react';

const DropDownsList = ({ departmentId }) => {
  const [department, setDepartment] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');
  const [selectedSubDepId, setSelectedSubDepId] = useState(null);

  useEffect(() => {
    const server = `https://art-school-backend.vercel.app/api/v1/departments/${departmentId}`;

    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const response = await fetch(server);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        setLoadingState('success');
        setDepartment(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingState('error');
      }
    };

    fetchData();
  }, [departmentId]);

  const handleDropDownClick = (subDepId) => {
    setSelectedSubDepId((prevId) => (prevId === subDepId ? null : subDepId));
  };

  return (
    <div>
      {loadingState === 'loading' && <p>Loading...</p>}
      {loadingState === 'success' &&
        department &&
        department.map((subDep) => (
          <DropDown
            key={subDep.id}
            subDep={subDep}
            isOpen={selectedSubDepId === subDep.id}
            onDropDownClick={() => handleDropDownClick(subDep.id)}
          />
        ))}
    </div>
  );
};

export default DropDownsList;

/*
import DropDown from './DropDown';
import { useState, useEffect } from 'react';

const DropDownsList = ({ departmentId }) => {
  const [department, setDepartment] = useState([]);
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    const server = `https://art-school-backend.vercel.app/api/v1/departments/${departmentId}`;

    const fetchData = async () => {
      setLoadingState('loading');
      try {
        const response = await fetch(server);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();

        setLoadingState('success');
        setDepartment(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoadingState('error');
      }
    };

    fetchData();
  }, [departmentId]);

  return (
    <div>
      {loadingState === 'loading' && <p>Loading...</p>}
      {loadingState === 'success' &&
        department &&
        department.map(subDep => <DropDown key={subDep.id} subDep={subDep} />)}
    </div>
  );
};

export default DropDownsList;
*/