export const createFormDataFromObject = (object: any) => {
  const formData = new FormData();
  Object.keys(object).map(key => {
    if (!!object[key]) {
      formData.append(key, object[key]);
    }
  });
  return formData;
}
