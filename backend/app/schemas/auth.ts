import { z } from "zod";

const username = z.string().trim().min(3);
const password = z.string().trim().min(6);

const LoginSchema = z.object({
  username,
  password,
});

type LoginType = z.infer<typeof LoginSchema>;

export { LoginSchema, LoginType };
