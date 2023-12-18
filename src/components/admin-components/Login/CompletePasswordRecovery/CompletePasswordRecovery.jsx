import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { completeRecoveryValidation } from './validationSchema';
import BasicContainerLogin from '../BasicContainerLogin/BasicContainerLogin';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import PasswordInput from '@/components/admin-components/formik/PasswordInput/PasswordInput';
import styles from './CompletePasswordRecovery.module.scss';

const initialValues = {
  password: '',
  confirm_password: '',
};

const CompletePasswordRecovery = () => {
  const onSubmit = () => {
    console.log('Увійти');
  };

  return (
    <BasicContainerLogin>
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
                  label="Новий Пароль*"
                  placeholder="Введіть 6 символів і більше"
                />
                <Field
                  name="confirm_password"
                  id="confirm_password"
                  component={PasswordInput}
                  showCharacterCount={false}
                  label="Повторіть Новий Пароль*"
                  placeholder="Повторіть свій пароль"
                />
                <div className={styles.button}>
                  <ButtonSubmit
                    handlerSubmitButton={onSubmit}
                    nameButton="Увійти"
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
    </BasicContainerLogin>
  );
};
export default CompletePasswordRecovery;
