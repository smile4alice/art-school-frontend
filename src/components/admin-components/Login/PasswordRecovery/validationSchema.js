import * as Yup from 'yup';

export const recoveryValidation = Yup.object().shape({
  email: Yup.string()
    .required('Поле не може бути пустим')
    .min(6, 'Електронна адреса має бути мінімум 6 символів')
    .max(40, 'Електронна адреса має бути максимум 40 символів')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введіть коректну електронну адресу'
    ),
});
