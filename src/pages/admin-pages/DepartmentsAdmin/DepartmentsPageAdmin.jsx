import { useEffect } from 'react';
import useDepartmentsStore from '@/store/departmentsStore';
import { useModal } from '@/store/modalStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import DepartmentsLayout from '@/components/admin-components/Departments/DepartmentsLayout/DepartmentsLayout';

const breadcrumbs = ['Відділення'];

const DepartmentsPageAdmin = () => {
  const { isModalOpen } = useModal();
  const { getDepartments } = useDepartmentsStore();
  const departments = useDepartmentsStore(state => state.departments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDepartments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDepartments, isModalOpen]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Відділення"
        showBackButton={false}
        showActionButton={false}
      />
      <DepartmentsLayout data={departments} />
    </div>
  );
};

export default DepartmentsPageAdmin;
