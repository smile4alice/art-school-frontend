import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { applicationValidation, documentValidation } from './validationSchema';
import useDocumentsStore from '@/store/documentsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PdfInput from '@/components/admin-components/formik/PdfInput/PdfInput';
import styles from './SchoolDocuments.module.scss';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';

const breadcrumbs = ['Документи школи', 'Редагувати документи школи'];

const initialValues = {
  title: '',
  document: [],
};

const EditSchoolDocuments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { value } = location.state;
  const { editDocument } = useDocumentsStore();
  const loading = useDocumentsStore(state => state.loading);
  const error = useDocumentsStore(state => state.error);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('doc_name', values.title);

      if (values.document[0].size === 0) {
        formData.append('doc_path', '');
      } else {
        formData.append('doc_path', values.document[0]);
      }

      const response = await editDocument(formData, value.id);
      if (response.status === 200) {
        navigate(`/admin/documents`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Редагувати документи школи"
        showBackButton={true}
        backButtonLink="/admin/documents"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={value.id === 1 ? applicationValidation : documentValidation}
        onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <div className={styles.inputWrapper}>
                  {value.id !== 1 && (
                    <Field
                      name="title"
                      id="text"
                      placeholder="Title"
                      component={TextInput}
                      maxLength={120}
                      text={value.doc_name}
                      showCharacterCount={true}
                      label="Назва документу*"
                    />
                  )}
                  <Field
                    name="document"
                    id="document"
                    label="Документ*"
                    component={PdfInput}
                    pdf={value.doc_path}
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

export default EditSchoolDocuments;
