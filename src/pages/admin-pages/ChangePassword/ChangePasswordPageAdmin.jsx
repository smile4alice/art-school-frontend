import axios from '@/utils/axios';
import { useModal } from '@/store/modalStore';
import { Field, Form, Formik } from 'formik';
import { passwordValidation } from './validationSchema';
import useAuthStore from '@/store/authStore';

import { useAuthorized } from '@/store/IsAuthorizedStore';
import { useNavigate } from 'react-router-dom';

import BreadCrumbs from '@/components/admin-components/BreadCrumbs/BreadCrumbs';
import ButtonSubmit from '@/components/admin-components/Buttons/SubmitButton/ButtonSubmit';
import PageTitle from '@/components/admin-components/PageTitle/PageTitle';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import ConfirmModal from '@/components/admin-components/modals/ConfirmModal/ConfirmModal';
import styles from './ChangePassword.module.scss';

const breadcrumbs = ['Зміна паролю'];

const initialValues = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePasswordPageAdmin = () => {
  const navigate = useNavigate();
  const { setUnAuthorized } = useAuthorized();
  const { changePassword } = useAuthStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);

  const onSubmit = async values => {
    const formData = new FormData();
    formData.append('old_password', values.oldPassword);
    formData.append('new_password', values.newPassword);
    formData.append('new_password_confirm', values.confirmPassword);
    await changePassword(formData);
    openModal();
  };

  const handleLogout = async () => {
    const value = localStorage.getItem('access_token');
    const exists = value !== null;
    if (exists) {
      await axios.post('/auth/logout').then(res => {
        if (res.status > 200 && res.status < 400) {
          localStorage.removeItem('access_token');
          setUnAuthorized();
          closeModal();
          navigate('/login');
        }
      });
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
                <div className={styles.fieltTextInput}>
                  <Field
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Поточний пароль"
                    component={PasswordInput}
                    label="Поточний пароль*"
                  />
                </div>
                {error && <p className={styles.error}>{error}</p>}
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

      {isModalOpen && (
        <ConfirmModal
          handleClick={handleLogout}
          message="Пароль успішно змінено, зайдіть під новим паролем"
        />
      )}
    </div>
  );
};

export default ChangePasswordPageAdmin;
