function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@udea\.edu\.co$/;
  return emailRegex.test(email);
};

export default isValidEmail;
