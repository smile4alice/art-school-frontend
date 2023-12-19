import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { recoveryValidation } from './validationSchema';
import useAuthStore from '@/store/authStore';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import styles from './PasswordRecovery.module.scss';

const initialValues = {
  email: '',
};

const PasswordRecovery = () => {
  const { sendMail } = useAuthStore();

  const onSubmit = async values => {
    const data = {
      email: values.email,
    };
    await sendMail(data);
  };

  return (
    <>
      <Heading title="Відновлення паролю" />
      <p className={styles.message}>
        Введіть email, пов’язаний з вашим акаунтом Якщо у вас є акаунт, вам на
        email буде надіслано посилання для відновлення паролю{' '}
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={recoveryValidation}
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
                <div className={styles.button}>
                  <ButtonSubmit
                    handlerSubmitButton={onSubmit}
                    nameButton="Надіслати"
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
export default PasswordRecovery;
