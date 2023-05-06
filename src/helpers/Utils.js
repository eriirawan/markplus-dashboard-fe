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
