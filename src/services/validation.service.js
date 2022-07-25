export const validateEmail = (email) => {
  const pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

export const validatePassword = (password) => {
  const pattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}/;
  return pattern.test(password);
};

export const validateMobile = (mobile) => {
  const pattern = /^[0]\d{10}$/;
  return pattern.test(mobile);
};

export const validateName = (name) => {
  const pattern = /^([a-zA-Z]).{2,50}$/;
  return pattern.test(name);
};

export const validateLicensePlate = (licensePlate) => {
  const pattern = /^[a-zA-Z]{2,4}[0-9]{2,4}[a-zA-Z]{2,4}$/;
  return pattern.test(licensePlate);
};

export const validateAccountNum = (number) => {
  const pattern = /^[0-9]{10}$/;
  return pattern.test(number);
};
