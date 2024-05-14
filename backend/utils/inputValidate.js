import { z } from "zod";
import { requiredMessage } from "./requiredMessage.js";

// ?====================REGISTER_VALIDATION=====================
export const registerValidate = z.object({
  name: z
    .string({
      required_error: requiredMessage("Name Is Required!"),
    })
    .min(3, {
      message: requiredMessage("Name Must Be At Leatst 3 Charachter(s)"),
    })
    .max(50),

  email: z
    .string({
      required_error: requiredMessage("Email Is Required!"),
    })
    .min(3)
    .max(150)
    .email(),

  password: z
    .string({
      required_error: requiredMessage("Password Is Required!"),
    })
    .min(6, {
      message: requiredMessage("Password Must Be At Leatst 6 Charachter(s)"),
    })
    .max(50),
});

// ?====================LOGIN_VALIDATION=====================
export const loginValidate = z.object({
  email: z
    .string({
      required_error: requiredMessage("Email Is Required!"),
    })
    .min(3)
    .max(150)
    .email(),

  password: z
    .string({
      required_error: requiredMessage("Password Is Required!"),
    })
    .min(6, {
      message: requiredMessage("Password Must Be At Leatst 6 Charachter(s)"),
    })
    .max(50),
});

// ?====================POST_VALIDATION=====================
export const postValidate = z.object({
  title: z
    .string({
      required_error: requiredMessage("Title Is Required!"),
    })
    .min(3, {
      message: requiredMessage("Title Must Be At Leatst 3 Charachter(s)"),
    })
    .max(50),

  content: z
    .string({
      required_error: requiredMessage("Title Is Required!"),
    })
    .min(3, {
      message: requiredMessage("Title Must Be At Leatst 3 Charachter(s)"),
    }),

  userId: z.string({
    required_error: requiredMessage("Unknown User!"),
  }),
});

// ?====================COMMENT_VALIDATION=====================
export const commentValidate = z.object({
  content: z
    .string({
      required_error: requiredMessage("Content Is Required!"),
    })
    .min(3, {
      message: requiredMessage("Comment Must Be At Leatst 3 Charachter(s)"),
    })
    .max(50),

  userId: z.string({
    required_error: requiredMessage("UserId Is Required!"),
  }),

  postId: z.string({
    required_error: requiredMessage("PostId Is Required!"),
  }),
});
