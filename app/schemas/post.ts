import { z } from "zod";

const message = z.string().trim();

const CreatePostSchema = z.object({
  message,
});

type CreatePostType = z.infer<typeof CreatePostSchema>;

export { CreatePostSchema, CreatePostType };
