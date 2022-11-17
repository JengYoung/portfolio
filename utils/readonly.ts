/* eslint-disable no-param-reassign */

const readonly = (obj: any) => {
  if (typeof obj === 'number') return obj;
  if (obj?.constructor?.name !== 'Object' && obj?.constructor?.name !== 'Array') return obj;

  Object.keys(obj).forEach((key) => {
    if (Object.getOwnPropertyDescriptors(obj)[key].writable) {
      obj[key] = readonly(obj[key]);
    }
  });

  obj = Object.freeze(obj);

  return obj;
};

export default readonly;
