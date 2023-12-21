import useDepartmentsStore from '@/store/departmentsStore';
import DepartmentCard from './DepartmentCard/DepartmentCard';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';

import styles from './DepartmentsLayout.module.scss';

const DepartmentsLayout = ({ data }) => {
  const loading = useDepartmentsStore(state => state.loading);

  if (loading) return <SpinnerAdmin />;

  return (
    <div className={styles.contentWrap}>
      {data &&
        Array.isArray(data) &&
        data.map(item => <DepartmentCard key={item.id} department={item} />)}
    </div>
  );
};
export default DepartmentsLayout;
