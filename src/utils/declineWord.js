export const declineWord = string => {
  if (string === 'Адреса') {
    return 'Адресу';
  }
  if (string === 'Карта') {
    return 'Карту';
  }
  if (string === 'Електронна пошта') {
    return 'Електронну Пошту';
  }
  if (string === 'Інформація для вступу') {
    return 'Інформацію для вступу';
  }
  if (string === 'Юридична інформація') {
    return 'Юридичну інформацію';
  }
  return string;
};
