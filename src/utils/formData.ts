export const createFormDataFromObject = (object: any) => {
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    const value: any = object[key];
    if (!!value) {
      if (Array.isArray(value)) {
        value.forEach(item => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    }
  });
  return formData;
}
