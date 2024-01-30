import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import { useModal } from '@/store/modalStore';
import useDepartmentsStore from '@/store/departmentsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import DepartmentsTable from '@/components/admin-components/Departments/DepartmentsTable/DepartmentsTable';
import DepartmentsTabs from '@/components/admin-components/Departments/DepartmentsTabs/DepartmentsTabs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import styles from './DepartmentsAdmin.module.scss';

const DepartmentPageAdmin = () => {
  const { id } = useParams();
  const { isModalOpen } = useModal();
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const { getOneDepartment, getDepartments } = useDepartmentsStore();
  const [thisDepartment, setThisdepartment] = useState([]);
  const [title, setTitle] = useState([]);
  const department = useDepartmentsStore(state => state.department);
  const departments = useDepartmentsStore(state => state.departments);
  const loading = useDepartmentsStore(state => state.loading);
  const error = useDepartmentsStore(state => state.error);
  const isAuthorized = useDepartmentsStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDepartments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDepartments]);

  useEffect(() => {
    const foundDepartment = departments.filter(item => item.id == id);
    setThisdepartment(foundDepartment);
  }, [id, departments]);

  useEffect(() => {
    if (thisDepartment) {
      setTitle(thisDepartment[0]?.department_name);
    }
  }, [thisDepartment]);

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
        showBackButton={true}
        backButtonLink="/admin/departments"
        showActionButton={true}
        actionButtonLink="/admin/departments/sub-department/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати відділ"
        stateTitle={title}
        stateId={id}
      />
      <DepartmentsTabs departments={departments} />
      {error && <p className={styles.error}>{error}</p>}
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <DepartmentsTable
          data={department}
          departmentId={thisDepartment[0]?.id}
        />
      )}
      {error && Object.keys(error).length && !department.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default DepartmentPageAdmin;
