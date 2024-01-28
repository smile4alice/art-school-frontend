import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import useDocumentsStore from '@/store/documentsStore';
import { documentValidation } from './validationSchema';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PdfInput from '@/components/admin-components/formik/PdfInput/PdfInput';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import styles from './SchoolDocuments.module.scss';

const breadcrumbs = ['Документи школи', 'Додати документи школи'];

const initialValues = {
  title: '',
  document: [],
};

const AddSchoolDocumentsPage = () => {
  const navigate = useNavigate();
  const { addDocument } = useDocumentsStore();
  const loading = useDocumentsStore(state => state.loading);
  const error = useDocumentsStore(state => state.error);

  const onSubmit = async values => {
    try {
      const formData = new FormData();
      formData.append('doc_name', values.title);
      if (values.document && values.document[0]) {
        formData.append('doc_path', values.document[0]);
      }
      await addDocument(formData);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Додати документи школи"
        showBackButton={true}
        backButtonLink="/admin/documents"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={documentValidation}
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
                    component={TextInput}
                    maxLength={120}
                    showCharacterCount={true}
                    label="Назва документу*"
                  />

                  <Field
                    name="document"
                    id="document"
                    label="Документ*"
                    component={PdfInput}
                  />
                </div>

                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid && !formik.values['title'] == ''}
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

export default AddSchoolDocumentsPage;
