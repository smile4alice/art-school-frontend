import { useEffect } from 'react';
import useAdministrationStore from '@/store/administrationStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import AdminTable from '@/components/admin-components/SchoolSdministration/AdminTable/AdminTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Адміністрація школи'];

const SchoolAdministrationPage = () => {
  const { getMembers } = useAdministrationStore();
  const members = useAdministrationStore(state => state.members);

  console.log(members);

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
      <AdminTable data={members} />
    </div>
  );
};

export default SchoolAdministrationPage;
