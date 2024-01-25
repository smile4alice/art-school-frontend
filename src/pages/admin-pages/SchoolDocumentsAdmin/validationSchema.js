import * as Yup from 'yup';
import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 1024 * 1024 * 3;

const fileTypes = ['application/pdf', 'for-url'];

function isValidFileType(fileType) {
  return fileTypes.includes(fileType);
}

export const documentValidation = Yup.object().shape({
  title: Yup.string()
    .required('Поле має бути заповнене')
    .min(2, 'Мінімальна довжина заголовку 2 символи')
    .max(120, 'Максимальна довжина заголовку 120 символів')
    .test('is-value', 'Додайте заголовок', value => value && value.length > 0)
    .matches(
      /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'$&+,=_@#Nº'<>^*()%'’`.,:;"()!?/+-]+$/,
      'Введіть коректну назву'
    ),

  document: Yup.mixed()
    .test('is-value', 'Додайте документ', value => value && value.length > 0)
    .test('is-image-from-db', 'Додайте документ', value => {
      value && value[0]?.size === 0 && value[0]?.type === 'for-url';
      return true;
    })
    .test('is-valid-type', 'Документ має бути в форматі .pdf', value =>
      isValidFileType(value && value[0]?.type)
    )
    .test(
      'is-valid-size',
      `Максимальний розмір документ ${formatBytes(sizeLimit)}`,
      value => value && value[0]?.size <= sizeLimit
    ),
});

export const applicationValidation = Yup.object().shape({
  document: Yup.mixed()
    .test('is-value', 'Додайте документ', value => value && value.length > 0)
    .test('is-image-from-db', 'Додайте документ', value => {
      value && value[0]?.size === 0 && value[0]?.type === 'for-url';
      return true;
    })
    .test('is-valid-type', 'Документ має бути в форматі .pdf', value =>
      isValidFileType(value && value[0]?.type)
    )
    .test(
      'is-valid-size',
      `Максимальний розмір документ ${formatBytes(sizeLimit)}`,
      value => value && value[0]?.size <= sizeLimit
    ),
});
