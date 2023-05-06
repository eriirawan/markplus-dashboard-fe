import { DateTime } from 'luxon';

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;

  return {
    height,
    width,
  };
};

export const luxonToISODate = (luxonDate) => {
  if (!luxonDate) return null;
  if (luxonDate instanceof DateTime === false) {
    throw new Error('LuxonToISODate: luxonDate is not instance of DateTime');
  }
  if (!luxonDate.isValid) return null;

  return luxonDate.toISO();
};

export const ISODateToLuxon = (ISODateString) => {
  if (!ISODateString) return null;
  if (DateTime.fromISO(ISODateString).isValid === false) return null;

  return DateTime.fromISO(ISODateString);
};

export const capitalizeString = (sentence) => {
  const words = sentence.split(' ');
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  return words.join(' ');
};

export const generatePageTitle = (title) => {
  window.document.title = `${title} - Mark Plus Dashboard`;
};
