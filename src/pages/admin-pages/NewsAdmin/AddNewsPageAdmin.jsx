import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { newsValidation } from './validationSchema';
import useNewsStore from '@/store/newsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/OurAchievements/FileInput/MyFileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './NewsAdmin.module.scss';

const breadcrumbs = ['Новини', 'Додати новину'];

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const AddNewsPage = () => {
  const navigate = useNavigate();
  const { addPost } = useNewsStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('text', values.text);
      formData.append('photo', values.image[0]);

      setIsProcessing(true);
      await addPost(formData);
      setIsProcessing(false);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати новину"
        showBackButton={true}
        backButtonLink="/admin/news"
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={newsValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="title"
                  id="title"
                  placeholder="Title"
                  component={TextInput}
                  maxLength={120}
                  showCharacterCount={true}
                  label="Заголовок Новини"
                />
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    label="Текст Новини"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото"
                  />
                </div>
                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid}
                    isRight={true}
                    handlerSubmitButton={onSubmit}
                    isProcessing={isProcessing}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddNewsPage;
