import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import { administrationValidation } from './validationSchema';
import useAdministrationStore from '@/store/administrationStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import FileInput from '@/components/admin-components/formik/FileInput/FileInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './SchoolAdministration.module.scss';

const breadcrumbs = ['Адміністрація школи', 'Додати працівника'];

const initialValues = {
  full_name: '',
  position: '',
  image: [],
};

const AddSchoolAdministrationPage = () => {
  const navigate = useNavigate();
  const { addMember } = useAdministrationStore();
  const { setUnAuthorized } = useAuthorized();
  const loading = useAdministrationStore(state => state.loading);
  const error = useAdministrationStore(state => state.error);
  const isAuthorized = useAdministrationStore(state => state.isAuthorized);

  useEffect(() => {
    if (isAuthorized) return;
    localStorage.removeItem('access_token');
    setUnAuthorized();
    navigate('/login');
  }, [isAuthorized, navigate, setUnAuthorized]);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('full_name', values.full_name);
      formData.append('position', values.position);
      formData.append('photo', values.image[0]);

      const res = await addMember(formData);
      if (res && res.status === 200) {
        navigate('/admin/administration');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати працівника адміністрації"
        showBackButton={true}
        backButtonLink="/admin/administration"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={administrationValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <div className={styles.fieltTextInput}>
                  <Field
                    name="full_name"
                    id="full_name"
                    component={TextInput}
                    maxLength={60}
                    showCharacterCount={true}
                    label="ПІБ працівника*"
                  />
                </div>
                <div className={styles.secondRow}>
                  <Field
                    name="position"
                    id="position"
                    component={TextArea}
                    maxLength={120}
                    showCharacterCount={true}
                    label="Посада*"
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

export default AddSchoolAdministrationPage;
