import { useState, useEffect } from 'react';
import useSlidersStore from '@/store/slidersStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SlidersTable from '@/components/admin-components/Sliders/SlidersTable/SlidersTable';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Слайдери'];

const SlidersPageAdmin = () => {
  const { getSlides } = useSlidersStore();
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getSlides();
        setSlides(result);
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
        actionButtonLabel="Додати слайдер"
      />
      <SlidersTable data={slides} />
    </div>
  );
};

export default SlidersPageAdmin;
