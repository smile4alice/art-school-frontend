import { Formik, Form, Field } from 'formik';

import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';

import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import styles from './PostersAdmin.module.scss';
import usePostersStore from '@/store/posterStore';
import AdminHome from '@/components/Icons/AdminHome';
import AdminArrow from '@/components/Icons/AdminArrow';
import { posterValidation } from './validationSchema';

const initialValues = {
  title: ' ',
  image: [],
};

const AddPostersPage = () => {
  const { addPoster } = usePostersStore();

  const onSubmit = async values => {
    console.log('values: ', values);
    try {
      await addPoster(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <AdminHome />
        <AdminArrow />
        <span>Афіші</span>
        <AdminArrow />
        <span>Додати афішу</span>
      </div>
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
