import * as Yup from 'yup';
import { formatBytes } from '@/utils/formatBytes';

const sizeLimit = 1024 * 1024 * 3;

const fileTypes = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/webp',
  'for-url',
];

function isValidFileType(fileType) {
  return fileTypes.includes(fileType);
}

export const achievementsValidation = Yup.object().shape({
  description: Yup.string()
    .required('Введіть опис досягнення')
    .min(2)
    .max(100)
    .matches(
      /^[a-zA-Zа-яА-ЯҐґЄєІіЇї\s\d'’.,:;"()!?-]+$/,
      'Введіть коректний опис'
    ),
  media: Yup.mixed()
    .required('Додайте зображення')
    .test(
      'is-valid-type',
      'Зображення має бути в форматі .jpg, .png або .webp',
      value => isValidFileType(value && value[0].type)
    )
    .test(
      'is-valid-size',
      `Максимальний розмір зображення ${formatBytes(sizeLimit)}`,
      value => value && value[0].size <= sizeLimit
    ),
});
