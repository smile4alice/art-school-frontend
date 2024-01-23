import * as Yup from 'yup';

export const completeRecoveryValidation = Yup.object().shape({
  password: Yup.string()
    .required('Введіть пароль')
    .min(8, 'Пароль має бути мінімум 8 символів')
    .max(64, 'Пароль має бути максимум 64 символи')
    .matches(
      /^(?=.*[a-zа-яґєії])/,
      'Повинен містити  хоча б одну маленьку літеру'
    )
    .matches(
      /^(?=.*[A-ZА-ЯҐЄІЇ])/,
      'Повинен містити хоча б  одну велику літеру'
    )
    .matches(/^(?=.*[0-9])/, 'Повинен містити хоча б  одну цифру')
    .matches(
      /^(?=.*[@#$%^&+=!])/,
      'Повинен містити хоча б один спеціальний символ  @ # $ % ^ & + = !'
    ),
  confirm_password: Yup.string()
    .required('Повторіть новий пароль')
    .test('passwords-match', 'Паролі не співпадають', function (value) {
      return this.parent.password === value;
    }),
});
