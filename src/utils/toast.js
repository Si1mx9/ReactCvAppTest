let addToastFn = null;

export function toast(message, type = 'success') {
  if (addToastFn) addToastFn(message, type);
}

export function setToastHandler(fn) {
  addToastFn = fn;
  return () => { addToastFn = null; };
}
