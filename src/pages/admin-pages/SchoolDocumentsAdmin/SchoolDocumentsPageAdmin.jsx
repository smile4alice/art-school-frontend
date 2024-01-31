import { useEffect } from 'react';
import useDocumentsStore from '@/store/documentsStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SchoolDocumentsTable from '@/components/admin-components/SchoolDocuments/SchoolDocumentsTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';
import PlaceholderAdmin from '@/components/admin-components/PlaceholderAdmin/PlaceholderAdmin';

const breadcrumbs = ['Документи школи'];

const SchoolDocumentsPageAdmin = () => {
  const { getDocuments } = useDocumentsStore();
  const documents = useDocumentsStore(state => state.documents);
  const loading = useDocumentsStore(state => state.loading);
  const error = useDocumentsStore(state => state.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getDocuments();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getDocuments]);

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Документи школи"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/documents/add"
        isActionButtonDisabled={documents?.length >= 8}
        actionButtonLabel="Додати документ"
      />
      {loading && !Object.keys(error).length ? (
        <SpinnerAdmin />
      ) : (
        <SchoolDocumentsTable data={documents} />
      )}
      {error && Object.keys(error).length && !documents.length ? (
        <PlaceholderAdmin />
      ) : null}
    </div>
  );
};

export default SchoolDocumentsPageAdmin;
