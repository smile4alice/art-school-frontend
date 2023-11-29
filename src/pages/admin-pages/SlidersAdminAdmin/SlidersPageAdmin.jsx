import React from 'react';
import PageTitle from '../../../components/admin-components/PageTitle/PageTitle';

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
     
    </div>
  );
};

export default SlidersPageAdmin;