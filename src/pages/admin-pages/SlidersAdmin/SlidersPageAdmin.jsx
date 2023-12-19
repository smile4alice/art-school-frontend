import { useEffect } from 'react';
import useSlidersStore from '@/store/slidersStore';
import { useModal } from '@/store/modalStore';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SlidersTable from '@/components/admin-components/Sliders/SlidersTable/SlidersTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Слайдери'];

const SlidersPageAdmin = () => {
  const { isModalOpen } = useModal();
  const { getSlides } = useSlidersStore();
  const slides = useSlidersStore(state => state.slides);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getSlides();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getSlides, isModalOpen]);

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
      <SlidersTable data={slides} />
    </div>
  );
};

export default SlidersPageAdmin;
