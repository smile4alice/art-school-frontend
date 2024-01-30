import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Formik, Form, Field } from 'formik';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import usePostersStore from '@/store/posterStore';
import { posterValidation } from './validationSchema';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import styles from './PostersAdmin.module.scss';

const breadcrumbs = ['Афіші', 'Редагувати афішу'];

const initialValues = {
  title: '',
  image: [],
};

const EditPostersPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostersById } = usePostersStore();
  const { updatePoster } = usePostersStore();
  const { setUnAuthorized } = useAuthorized();
  const loading = usePostersStore(state => state.loading);
  const poster = usePostersStore(state => state.poster);
  const error = usePostersStore(state => state.error);
  const isAuthorized = usePostersStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPostersById(id);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getPostersById, id]);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      if (values.image && values.image[0]) {
        if (values.image[0].size === 0) {
          formData.append('photo', '');
        } else {
          formData.append('photo', values.image[0]);
        }
      }

      const res = await updatePoster(formData, id);
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
      <div>
        <PageTitle
          title="Редагувати афішу"
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
                      id="title"
                      placeholder="Title"
                      component={TextArea}
                      maxLength={120}
                      showCharacterCount={true}
                      text={poster?.title}
                      label="Заголовок*"
                    />
                    <Field
                      name="image"
                      id="image"
                      component={FileInput}
                      photo={poster?.photo}
                      label="Фото*"
                    />
                  </div>
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
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default EditPostersPage;
