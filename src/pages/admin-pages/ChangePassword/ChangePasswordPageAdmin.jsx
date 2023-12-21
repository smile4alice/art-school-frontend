import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import { Field, Form, Formik } from 'formik';
import styles from './ChangePassword.module.scss';
import { passwordValidation } from './validationSchema';

const breadcrumbs = ['Зміна паролю'];
const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const ChangePasswordPageAdmin = () => {
  return (
    <div>
      <BreadCrumbs breadcrumbs={breadcrumbs} />
      <PageTitle
        title="Зміна паролю"
        showBackButton={false}
        showActionButton={false}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={passwordValidation}
        // onSubmit={onSubmit}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Поточний пароль"
                  component={TextInput}
                  label="Поточний пароль*"
                />
                <Field
                  name="newPassword"
                  id="newPassword"
                  placeholder="Новий пароль"
                  component={PasswordInput}
                  label="Новий пароль*"
                />
                <Field
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Повторити новий пароль"
                  component={PasswordInput}
                  label="Повторити новий пароль*"
                />

                <div className={styles.button}>
                  <ButtonSubmit
                    nameButton="Зберегти зміни"
                    isActive={formik.isValid}
                    isRight={true}
                    // handlerSubmitButton={onSubmit}
                    // isProcessing={isProcessing}
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

export default ChangePasswordPageAdmin;
