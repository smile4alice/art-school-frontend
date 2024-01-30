import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import useAdministrationStore from '@/store/administrationStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import AdminTable from '@/components/admin-components/SchoolSdministration/AdminTable/AdminTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';
import styles from './SchoolAdministration.module.scss';

const breadcrumbs = ['Адміністрація школи'];

const SchoolAdministrationPage = () => {
  const { getMembers } = useAdministrationStore();
  const { setUnAuthorized } = useAuthorized();
  const navigate = useNavigate();
  const members = useAdministrationStore(state => state.members);
  const loading = useAdministrationStore(state => state.loading);
  const error = useAdministrationStore(state => state.error);
  const isAuthorized = useAdministrationStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getMembers();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getMembers]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Адміністрація школи"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/administration/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати працівника адміністрації"
      />
      {error && <p className={styles.error}>{error}</p>}
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <AdminTable data={members} />
      )}
      {error && Object.keys(error).length && !members.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default SchoolAdministrationPage;
