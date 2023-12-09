import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import Table from '@/components/admin-components/Frame/Frame';
const AddSlidersPageAdmin = () => {
  return (
    <div>
      <PageTitle
        title="Додати cлайдер"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
      <Table />
    </div>
  );
};

export default AddSlidersPageAdmin;
