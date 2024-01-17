import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { newsValidation } from './validationSchema';
import { declineWord } from '@/utils/declineWord';
import useDepartmentsStore from '@/store/departmentsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import TextArea from '@/components/admin-components/formik/TextArea/TextArea';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './DepartmentsAdmin.module.scss';

const initialValues = {
  title: '',
  text: '',
};

const AddSubDepartmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, departmentId } = location.state;
  const { addDepartment } = useDepartmentsStore();
  const loading = useDepartmentsStore(state => state.loading);
  const error = useDepartmentsStore(state => state.error);

  const breadcrumbs = [
    'Відділення',
    `${title}`,
    `Додати відділ ${declineWord(title)}`,
  ];

  const onSubmit = async values => {
    try {
      const newSubDepartment = {
        sub_department_name: values.title,
        description: values.text,
        main_department_id: departmentId,
      };
      const response = await addDepartment(newSubDepartment);
      console.log(response.status);
      if (response.status === 200) {
        navigate(`/admin/departments/${departmentId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title={`Додати відділ ${declineWord(title)}`}
        showBackButton={true}
        backButtonLink={`/admin/departments/${departmentId}`}
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
                <div className={styles.secondRow}>
                  <div className={styles.fieltTextInput}>
                    <Field
                      name="title"
                      id="title"
                      placeholder="Title"
                      component={TextInput}
                      maxLength={120}
                      showCharacterCount={true}
                      label="Назва відділу*"
                    />
                  </div>
                  <Field
                    name="text"
                    id="text"
                    placeholder="Title"
                    component={TextArea}
                    maxLength={10000}
                    showCharacterCount={true}
                    label="Опис"
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

export default AddSubDepartmentPage;
