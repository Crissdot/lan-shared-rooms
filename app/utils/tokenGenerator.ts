const generateToken = (): string => {
  const time = new Date().getTime().toString();
  const random = Math.random().toString(36).substring(2);

  return time + random;
}

export { generateToken };
