import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import { Field, Form, Formik } from 'formik';
import styles from './ChangePassword.module.scss';
import { passwordValidation } from './validationSchema';
import useAuthStore from '@/store/authStore';
import ConfirmModal from './ConfirmModal/ConfirmModal';
import { useModal } from '@/store/modalStore';
import { useState } from 'react';

const breadcrumbs = ['Зміна паролю'];
const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};
const ChangePasswordPageAdmin = () => {
  const { changePassword } = useAuthStore();
  const { isModalOpen, openModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async values => {
    console.log('values: ', values);
    const formData = new FormData();
    formData.append('old_password', values.oldPassword);
    formData.append('new_password', values.newPassword);
    formData.append('new_password_confirm', values.confirmPassword);
    setIsLoading(true);
    const response = await changePassword(formData);
    if (response.status === 200) {
      setIsLoading(false);
      openModal();
    }
  };
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
        onSubmit={onSubmit}
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
                    isProcessing={isLoading}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

      {isModalOpen && <ConfirmModal />}
    </div>
  );
};

export default ChangePasswordPageAdmin;
