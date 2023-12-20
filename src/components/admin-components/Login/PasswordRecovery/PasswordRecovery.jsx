import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { recoveryValidation } from './validationSchema';
import useAuthStore from '@/store/authStore';
import Heading from '../Heading/Heading';
import ButtonSubmit from '../../Buttons/SubmitButton/ButtonSubmit.jsx';
import TextInput from '@/components/admin-components/formik/TextInput/TextInput';
import PasswordRecoveryAlert from './PasswordRecoveryAlert/PasswordRecoveryAlert';
import styles from './PasswordRecovery.module.scss';

const initialValues = {
  email: '',
};

const PasswordRecovery = () => {
  const { sendMail } = useAuthStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async values => {
    try {
      const data = {
        email: values.email,
      };
      const result = await sendMail(data);
      console.log(result);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isSubmitted ? (
        <>
          <Heading title="Відновлення паролю" />
          <p className={styles.message}>
            Введіть електронну пошту, пов’язану з вашим акаунтом Якщо у вас є
            акаунт, вам на електронну пошту буде надіслано посилання для
            відновлення паролю{' '}
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
                        isActive={formik.isValid && formik.touched['email']}
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
      ) : (
        <PasswordRecoveryAlert setIsSubmitted={setIsSubmitted} />
      )}
    </>
  );
};
export default PasswordRecovery;
