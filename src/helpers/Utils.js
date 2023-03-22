export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
    width,
  };
};