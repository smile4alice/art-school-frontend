import * as Yup from 'yup';

export const newsValidation = Yup.object().shape({
  title: Yup.string()
    .required('Поле має бути заповнене')
    .min(2, 'Мінімальна довжина назви 2 символи')
    .max(120, 'Максимальна довжина назви 120 символів')
    .test('is-value', 'Додайте заголовок', value => value && value.length > 0)
    .matches(/^[а-яА-ЯҐґЄєІіЇї\s\d'’`.,:;"()!?-№]+$/, 'Введіть коректну назву'),
  text: Yup.string()
    .min(2, 'Мінімальна довжина опису 2 символи')
    .max(10000, 'Максимальна довжина опису 10000 символів')
    .matches(/^[а-яА-ЯҐґЄєІіЇї\s\d'’`.,:;"()!-№]+$/, 'Введіть коректний опис'),
});
