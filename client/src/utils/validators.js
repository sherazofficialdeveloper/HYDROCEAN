export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  const regex = /^[0-9+\-\s()]{8,15}$/;
  return regex.test(phone);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateMinLength = (value, min) => {
  return value && value.trim().length >= min;
};

export const validateMaxLength = (value, max) => {
  return value && value.trim().length <= max;
};