import { useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { declineWord } from '@/utils/declineWord';
import { contactsValidation } from './validationSchema';
import { getFieldLength } from '@/utils/getFieldLength';
import useContactsStore from '@/store/contactsStore';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import styles from './ContactsAdmin.module.scss';

const EditContactsPageAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { key, title, value } = location.state;
  const { editContact } = useContactsStore();
  const loading = useContactsStore(state => state.loading);
  const error = useContactsStore(state => state.error);

  const breadcrumbs = [`${title}`, `Редагувати ${declineWord(title)}`];

  const initialValues = {};

  const handleSubmit = async values => {
    try {
      const res = await editContact(values);
      if (res && res.status === 200) {
        navigate('/admin/contacts');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title={`Редагувати ${declineWord(title)}`}
        showBackButton={true}
        backButtonLink="/admin/contacts"
        showActionButton={false}
      />
      {error && <p className={styles.error}>{error}</p>}
      <Formik
        initialValues={initialValues}
        validationSchema={contactsValidation}
        onSubmit={handleSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name={`${key.toLowerCase()}`}
                  id={`${key.toLowerCase()}`}
                  component={TextInput}
                  showCharacterCount={true}
                  maxLength={getFieldLength(key)}
                  text={value}
                  label={`${title}`}
                />
                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid && !formik.values[key] == ''}
                    isRight={true}
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

export default EditContactsPageAdmin;
