export const declineWord = string => {
  let word = '';
  if (string === 'Адреса') {
    word = 'Адресу';
  }
  if (string === 'Карта') {
    word = 'Карту';
  }
  if (string === 'Інформація для вступу') {
    word = 'Інформацію для вступу';
  }
  if (string === 'Юридична інформація') {
    word = 'Юридичну інформацію';
  }
  return word;
};
