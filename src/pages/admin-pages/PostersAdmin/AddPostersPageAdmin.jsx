import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import usePostersStore from '@/store/posterStore';
import { posterValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './PostersAdmin.module.scss';

const breadcrumbs = ['Афіші', 'Додати афішу'];

const initialValues = {
  title: ' ',
  image: [],
};

const AddPostersPage = () => {
  const navigate = useNavigate();
  const { addPoster } = usePostersStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('photo', values.image[0]);
      setIsProcessing(true);
      await addPoster(formData);
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
        title="Додати Афішу"
        showBackButton={true}
        backButtonLink="/admin/posters"
        showActionButton={false}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={posterValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <div className={styles.inputWrapper}>
                  <Field
                    name="title"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={120}
                    showCharacterCount={true}
                    label="Заголовок"
                  />

                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    // label="Фото"
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

export default AddPostersPage;
