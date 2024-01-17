export const getFieldLength = val => {
  if (val === 'map_url') {
    return 300;
  }
  if (val === 'address') {
    return 2000;
  }
  if (val === 'phone') {
    return 300;
  }
  if (val === 'email') {
    return 300;
  }
  if (val === 'facebook_url') {
    return 300;
  }
  if (val === 'youtube_url') {
    return 300;
  }
};
