import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthorized } from '@/store/IsAuthorizedStore';
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
  title: '',
  image: [],
};

const AddPostersPage = () => {
  const navigate = useNavigate();
  const { addPoster } = usePostersStore();
  const { setUnAuthorized } = useAuthorized();
  const loading = usePostersStore(state => state.loading);
  const error = usePostersStore(state => state.error);
  const isAuthorized = usePostersStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image && values.image[0]) {
        formData.append('photo', values.image[0]);
      }
      const res = await addPoster(formData);
      if (res && res.status === 200) {
        navigate('/admin/posters');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати афішу"
        showBackButton={true}
        backButtonLink="/admin/posters"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
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
                    label="Заголовок*"
                  />

                  <Field
                    name="image"
                    id="image"
                    label="Фото*"
                    component={FileInput}
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

export default AddPostersPage;
