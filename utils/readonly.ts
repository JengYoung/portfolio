/* eslint-disable no-param-reassign */

const readonly = (object: any) => {
  if (object?.constructor?.name !== 'Object' && object?.constructor?.name !== 'Array') return object;
  
  Object.keys(object).forEach((key) => {
    object[key] = readonly(object[key]);
  })

  object = Object.freeze(object);

  return object;
}

export default readonly;