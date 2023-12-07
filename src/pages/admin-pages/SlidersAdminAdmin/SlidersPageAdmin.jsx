import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import SlidersTable from '@/components/admin-components/Sliders/SlidersTable/SlidersTable';

const SlidersPageAdmin = () => {
  return (
    <div>
      <PageTitle
        title="Слайдери"
        showBackButton={false}
        showActionButton={true}
        actionButtonLink="/admin/sliders-add"
        isActionButtonDisabled={false}
        actionButtonLabel="Додати слайдер"
      />
      <SlidersTable />
    </div>
  );
};

export default SlidersPageAdmin;
