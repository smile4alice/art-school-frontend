import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PostersInput from '@/components/admin-components/Posters/posterInput/PostesInput';

const AddPostersPage = () => {
  return (
    <div>
      <PageTitle
        title="Додати афішу"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
     <PostersInput/>
      <ButtonSubmit
        nameButton="Зберегти зміни"
        isActive={true}
        isRight={true}
      />
    </div>
  );
};

export default AddPostersPage;
