export const passwordValidator = (password) => {
  if (password.length < 8) {
    return {
      field: "password",
      message: "Password must be at least 8 characters long.",
    };
  }
  return {
    field: "password",
    message: null,
  };
};
