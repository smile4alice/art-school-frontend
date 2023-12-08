import { useState } from 'react';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import NewsInputLayout from '@/components/admin-components/News/NewsInputLayout/NewsInputLayout';

const AddNewsPage = () => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const onSubmit = () => {};

  return (
    <div>
      <PageTitle
        title="Додати новину"
        showBackButton={true}
        backButtonLink="/admin/sliders"
        showActionButton={false}
      />
      <form>
        <NewsInputLayout
          title={title}
          setTitle={setTitle}
          text={text}
          setText={setText}
        />
        <ButtonSubmit
          nameButton="Зберегти зміни"
          isActive={true}
          isRight={true}
          handlerSubmitButton={onSubmit}
        />
      </form>
    </div>
  );
};

export default AddNewsPage;
