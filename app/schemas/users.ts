import { z } from "zod";
import { sequelize } from '../core/sequelize';

const username = z.string().trim().min(3);
const password = z.string().trim().min(6);
const passwordConfirm = z.string().trim().min(6);

const CreateUserSchema = z.object({
  username,
  password,
  passwordConfirm,
}).refine(data => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
}).refine(async ({username}) => {
  const user = await sequelize.models.User.findOne({where: { username }});
  return !user;
}, {
  message: "Current username already exists",
});

type CreateUserType = z.infer<typeof CreateUserSchema>;

export { CreateUserSchema, CreateUserType };
