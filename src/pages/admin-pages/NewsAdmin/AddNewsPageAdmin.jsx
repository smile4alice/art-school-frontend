import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { newsValidation } from './validationSchema';
import useNewsStore from '@/store/newsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './NewsAdmin.module.scss';

const breadcrumbs = ['Події', 'Додати подію'];

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const AddNewsPage = () => {
  const navigate = useNavigate();
  const { addPost } = useNewsStore();
  const loading = useNewsStore(state => state.loading);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('text', values.text);
      if (values.image && values.image[0]) {
        formData.append('photo', values.image[0]);
      }
      const res = await addPost(formData);
      if (res && res.status === 200) {
        navigate('/admin/news');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати подію"
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
                <div className={styles.fieltTextInput}>
                  <Field
                    name="title"
                    id="title"
                    component={TextInput}
                    maxLength={120}
                    showCharacterCount={true}
                    label="Заголовок*"
                  />
                </div>
                <div className={styles.secondRow}>
                  <Field
                    name="text"
                    id="text"
                    component={TextArea}
                    maxLength={2000}
                    showCharacterCount={true}
                    label="Текст"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    label="Фото*"
                  />
                </div>
                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={
                      formik.isValid && Object.keys(formik.touched).length
                    }
                    isRight={true}
                    handlerSubmitButton={onSubmit}
                    isProcessing={loading}
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
