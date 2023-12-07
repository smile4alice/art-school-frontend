import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import NewsInputLayout from '@/components/admin-components/News/NewsInputLayout/NewsInputLayout';

const AddNewsPage = () => {
  return (
    <div>
      <PageTitle
        title="Додати новину"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
      <NewsInputLayout />
      <ButtonSubmit
        nameButton="Зберегти зміни"
        isActive={true}
        isRight={true}
      />
    </div>
  );
};

export default AddNewsPage;
