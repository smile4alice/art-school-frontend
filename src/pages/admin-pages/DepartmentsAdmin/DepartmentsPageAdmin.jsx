import { useEffect, useState } from 'react';
import useDepartmentsStore from '@/store/departmentsStore';
import { useModal } from '@/store/modalStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import DepartmentsLayout from '@/components/admin-components/Departments/DepartmentsLayout/DepartmentsLayout';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';

const breadcrumbs = ['Відділення'];

const DepartmentsPageAdmin = () => {
  const { isModalOpen } = useModal();
  const { getDepartments } = useDepartmentsStore();
  const [loading, setLoading] = useState(false);
  const departments = useDepartmentsStore(state => state.departments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await getDepartments();
        setLoading(false);
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
      {loading ? <SpinnerAdmin /> : <DepartmentsLayout data={departments} />}
    </div>
  );
};

export default DepartmentsPageAdmin;
