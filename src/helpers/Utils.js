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

export const formatBytes = (bytes, decimals = 2) => {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const encodeQueryData = (data) => {
  const ret = [];
  for (let d in data)
    if (data[d]) {
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }
  return ret.join('&');
};
