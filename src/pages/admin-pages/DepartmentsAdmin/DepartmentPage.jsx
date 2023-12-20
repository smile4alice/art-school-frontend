import { useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useModal } from '@/store/modalStore';
import useDepartmentsStore from '@/store/departmentsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import DepartmentsTable from '@/components/admin-components/Departments/DepartmentsTable/DepartmentsTable';

const DepartmentPageAdmin = () => {
  const location = useLocation();
  const { title } = location.state;
  const { id } = useParams();
  const { isModalOpen } = useModal();
  const { getOneDepartment } = useDepartmentsStore();
  const department = useDepartmentsStore(state => state.department);

  const breadcrumbs = ['Відділення', `${title}`];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOneDepartment(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getOneDepartment, isModalOpen, id]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title={`${title}`}
        showBackButton={false}
        showActionButton={false}
      />
      <DepartmentsTable data={department} />
    </div>
  );
};

export default DepartmentPageAdmin;
