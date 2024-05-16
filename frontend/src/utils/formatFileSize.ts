// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formatFileSize = (size: any) => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const threshold = 1024;
  // eslint-disable-next-line no-param-reassign
  size = Number(size) * threshold;
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return `${+(size / threshold ** i).toFixed(2) * 1} ${units[i]}`;
};

export default formatFileSize;
