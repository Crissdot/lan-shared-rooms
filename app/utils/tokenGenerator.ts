const generateToken = (): string => {
  const time = new Date().getTime().toString();
  const random = Math.random().toString(36).substring(2);
  console.log(time, random)

  return time + random;
}

export { generateToken };
