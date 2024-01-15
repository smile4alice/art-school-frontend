import { useEffect } from 'react';
import useSlidersStore from '@/store/slidersStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SchoolDocumentsTable from '@/components/admin-components/SchoolDocuments/SchoolDocumentsTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';

const breadcrumbs = ['Документи школи'];

const SchoolDocumentsPageAdmin = () => {
  const { getSlides } = useSlidersStore();
  const documents = useSlidersStore(state => state.documents);
  const loading = useSlidersStore(state => state.loading);
  const error = useSlidersStore(state => state.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSlides();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getSlides]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Документи школи"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/documents/add"
        isActionButtonDisabled={documents.length >= 8}
        actionButtonLabel="Додати документ"
      />
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <SchoolDocumentsTable data={documents} />
      )}
      {error && Object.keys(error).length ? <PlaceholderAdmin /> : null}
    </div>
  );
};

export default SchoolDocumentsPageAdmin;
