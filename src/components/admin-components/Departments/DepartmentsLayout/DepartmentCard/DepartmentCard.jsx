import { Link } from 'react-router-dom';
import styles from './DepartmentCard.module.scss';

const DepartmentCard = ({ department }) => {
  return (
    <Link
      className={styles.card}
      to={`/admin/departments/${department.id}`}
      state={{ title: department.department_name }}
    >
      <div>{department.department_name}</div>
    </Link>
  );
};

export default DepartmentCard;
