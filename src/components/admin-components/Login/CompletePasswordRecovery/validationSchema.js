import * as Yup from 'yup';

export const completeRecoveryValidation = Yup.object().shape({
  password: Yup.string()
    .required('Поле не може бути пустим')
    .min(6, 'Пароль має бути мінімум 6 символів')
    .max(20),
  confirm_password: Yup.string().test(
    'passwords-match',
    'Passwords must match',
    function (value) {
      return this.parent.password === value;
    }
  ),
});
