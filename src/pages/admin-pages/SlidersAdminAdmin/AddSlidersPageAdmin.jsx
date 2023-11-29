import React from 'react';
import PageTitle from '../../../components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '../../../components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import Table from '../../../components/admin-components/Frame/Frame'
const AddSlidersPage = () => {
  return (
    <div>
       <PageTitle
        title="Додати cлайдер"
        showBackButton={true}    
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />  
      <Table/>

      <ButtonSubmit
        nameButton="Зберегти зміни"
        isActive={true}
        isRight={true}
      />     
    </div>
  );
};

export default AddSlidersPage;