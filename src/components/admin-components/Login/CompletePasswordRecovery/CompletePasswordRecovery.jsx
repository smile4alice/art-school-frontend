import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import useAuthStore from '@/store/authStore';
import { completeRecoveryValidation } from './validationSchema';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import styles from './CompletePasswordRecovery.module.scss';

const initialValues = {
  password: '',
  confirm_password: '',
};

const CompletePasswordRecovery = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuthStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const error = useAuthStore(state => state.error);
  const success = useAuthStore(state => state.success);

  const onSubmit = async values => {
    try {
      const data = {
        token: token,
        password: values.password,
      };
      setIsProcessing(true);
      await resetPassword(data);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
      setIsProcessing(false);
      setTimeout(() => {
        navigate('/login/password-recovery');
      }, 8000);
    }
  };

  useEffect(() => {
    if (success) {
      navigate('/login/password-recovery-success');
    }
  }, [success, navigate]);

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
    </>
  );
};
export default CompletePasswordRecovery;
