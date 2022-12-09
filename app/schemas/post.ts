import { z } from "zod";

const message = z.string().trim();

const PostSchema = z.object({
  message,
});

export { PostSchema };
