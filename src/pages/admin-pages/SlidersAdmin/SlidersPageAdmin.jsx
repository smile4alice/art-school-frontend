import { useEffect } from 'react';
import useSlidersStore from '@/store/slidersStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SlidersTable from '@/components/admin-components/Sliders/SlidersTable/SlidersTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import SpinnerAdmin from '@/components/admin-components/SpinnerAdmin/SpinnerAdmin';

const breadcrumbs = ['Слайдери'];

const SlidersPageAdmin = () => {
  const { getSlides } = useSlidersStore();
  const slides = useSlidersStore(state => state.slides);
  const loading = useSlidersStore(state => state.loading);

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
        title="Слайдери"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/sliders/add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати слайд"
      />
      {loading ? <SpinnerAdmin /> : <SlidersTable data={slides} />}
    </div>
  );
};

export default SlidersPageAdmin;
