/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import { Formik, Form, Field } from 'formik';
import { loginValidation } from './validationSchema';
import { useAuthorized } from '@/store/IsAuthorizedStore';
import useAuthStore from '@/store/authStore';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import PasswordInput from '../../formik/PasswordInput/PasswordInput';
import TextInput from '../../formik/TextInput/TextInput';
import styles from './SignIn.module.scss';

const initialValues = {
  password: '',
  email: '',
};

const SignIn = () => {
  const { setIsAuthorized } = useAuthorized();
  const isAuthorized = useAuthorized(state => state.isAuthorized);
  const { login } = useAuthStore();
  const error = useAuthStore(state => state.error);

  const checkToken = key => {
    // Get the value of the key from local storage
    const value = localStorage.getItem(key);
    // Check if the value is not null
    const exists = value !== null;
    // If the key exists, remove it
    if (exists) {
      setIsAuthorized();
    }
  };

  useEffect(() => {
    checkToken('access_token');
  }, []);

  if (isAuthorized) return <Navigate to="/admin" />;

  const onSubmit = async values => {
    const formData = new FormData();
    formData.append('password', values.password);
    formData.append('username', values.email);
    await login(formData);
    checkToken('access_token');
  };

  return (
    <div className={styles.form}>
      <Heading title="Увійти в акаунт" />
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginValidation}
      >
        {formik => {
          return (
            <Form>
              <div className={styles.layout}>
                <Field
                  name="email"
                  id="email"
                  component={TextInput}
                  showCharacterCount={false}
                  label="Електронна пошта*"
                  placeholder="name@mail.com"
                />
                <Field
                  name="password"
                  id="password"
                  component={PasswordInput}
                  showCharacterCount={false}
                  label="Пароль*"
                  placeholder="Введіть 8 символів і більше"
                />
                {error && <p className={styles.error}>{error}</p>}
              </div>
              <div className={styles.button}>
                <ButtonSubmit
                  handlerSubmitButton={onSubmit}
                  nameButton="Увійти"
                  isActive={
                    formik.isValid && Object.keys(formik.touched).length
                  }
                />
              </div>
            </Form>
          );
        }}
      </Formik>
      <Link to="/login/password-recovery" className={styles.link}>
        Забули пароль?
      </Link>
    </div>
  );
};
export default SignIn;
