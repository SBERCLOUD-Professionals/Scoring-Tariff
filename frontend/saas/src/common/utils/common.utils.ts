/* eslint-disable no-plusplus,no-bitwise,no-empty */
const generateId = () => Math.random().toString(36).substr(2, 9);

const hashCode = (s: string = '') => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return h;
};

export const commonUtils = {
  generateId,
  hashCode,
};
