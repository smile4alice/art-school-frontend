import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import useNewsStore from '@/store/newsStore';
import { newsValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './NewsAdmin.module.scss';

const breadcrumbs = ['Події', 'Редагувати захід'];

const initialValues = {
  title: '',
  text: '',
  image: [],
};

const EditNewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOnePost, editPost } = useNewsStore();
  const post = useNewsStore(state => state.post);
  const loading = useNewsStore(state => state.loading);
  const error = useNewsStore(state => state.error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getOnePost(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, getOnePost]);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('text', values.text);
      if (values.image && values.image[0]) {
        if (values.image[0].size === 0) {
          formData.append('photo', '');
        } else {
          formData.append('photo', values.image[0]);
        }
      }

      const res = await editPost(id, formData);
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
        title="Редагувати захід"
        showBackButton={true}
        backButtonLink="/admin/news"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
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
                    text={post?.title}
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
                    text={post?.text}
                    label="Текст"
                  />
                  <Field
                    name="image"
                    id="image"
                    component={FileInput}
                    photo={post?.photo}
                    label="Фото*"
                  />
                </div>
                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid}
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

export default EditNewsPage;
