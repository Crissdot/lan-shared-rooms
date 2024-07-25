import { z } from "zod";

const page = z.number().optional();
const size = z.number().optional();
const message = z.string().trim().optional();

const GetPostSchema = z.object({
  page,
  size
});

const CreatePostSchema = z.object({
  message,
});

type GetPostType = z.infer<typeof GetPostSchema>;
type CreatePostType = z.infer<typeof CreatePostSchema>;

export { GetPostSchema, GetPostType, CreatePostSchema, CreatePostType };
