import * as Yup from 'yup';

export const recoveryValidation = Yup.object().shape({
  email: Yup.string()
    .required('Поле не може бути пустим')
    .min(2)
    .max(20)
    .matches(
      /^[a-zA-Z0-9._%+-]+@(?!.*\.(ru|by))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введіть email user@mail.com'
    ),
});
