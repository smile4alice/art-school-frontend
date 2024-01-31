import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import useAuthStore from '@/store/authStore';
import { useModal } from '@/store/modalStore';
import { completeRecoveryValidation } from './validationSchema';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import ConfirmModal from '@/components/admin-components/modals/ConfirmModal/ConfirmModal';
import styles from './CompletePasswordRecovery.module.scss';

const initialValues = {
  password: '',
  confirm_password: '',
};

const CompletePasswordRecovery = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isProcessing, setIsProcessing] = useState(false);
  const error = useAuthStore(state => state.error);

  const onSubmit = async values => {
    const data = {
      token: token,
      password: values.password,
    };
    setIsProcessing(true);
    const response = await resetPassword(data);
    if (response && response.status === 200) {
      openModal();
      setIsProcessing(false);
      setTimeout(() => {
        navigate('/login/password-recovery-success');
      }, 5000);
    } else {
      setIsProcessing(false);
      setTimeout(() => {
        navigate('/login/password-recovery');
      }, 8000);
    }
  };

  return (
    <>
      <Heading title="Завершення відновлення паролю" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={completeRecoveryValidation}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="password"
                  id="password"
                  component={PasswordInput}
                  showCharacterCount={false}
                  label="Новий пароль*"
                  placeholder="Введіть 8 символів і більше"
                />
                <Field
                  name="confirm_password"
                  id="confirm_password"
                  component={PasswordInput}
                  showCharacterCount={false}
                  label="Повторити новий пароль*"
                  placeholder="Повторіть свій пароль"
                />
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.button}>
                  <ButtonSubmit
                    handlerSubmitButton={onSubmit}
                    nameButton="Змінити пароль"
                    isProcessing={isProcessing}
                    isActive={
                      formik.isValid && Object.keys(formik.touched).length
                    }
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
      <Link to="/login" className={styles.link}>
        Я згадав пароль!
      </Link>
      {isModalOpen && (
        <ConfirmModal
          handleClick={closeModal}
          message="Пароль успішно змінено"
        />
      )}
    </>
  );
};
export default CompletePasswordRecovery;
