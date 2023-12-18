import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  password: Yup.string().required('Поле не може бути пустим').min(6).max(20),
  email: Yup.string()
    .required('Поле не може бути пустим')
    .min(2)
    .max(40)
    .matches(
      /^[a-zA-Z0-9._%+-]+@(?!.*\.(ru|by))[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Введіть email user@mail.com'
    ),
});
