import Joi from "joi";

//Blog Validation
export const addBlogSchema = Joi.object({
  BlogTitle: Joi.string().min(3).max(100).trim().required().messages({
    "string.base": "Blog title must be in string format",
    "string.empty": "Blog title cannot be empty",
    "string.min": "Blog title must be at least 3 characters long",
    "string.max": "Blog title cannot exceed 100 characters",
    "any.required": "Blog title is required",
  }),

  Content: Joi.string().min(20).required().messages({
    "string.base": "Content must be in string format",
    "string.empty": "Content cannot be empty",
    "string.min": "Content must be at least 20 characters long",
    "any.required": "Content is required",
  }),

  Category: Joi.string()
    .valid("Technology", "Sports", "Politics")
    .required()
    .messages({
      "any.only": "Category must be Technology, Sports or Politics",
      "any.required": "Category is required",
    }),
});

export const updateBlogSchema = addBlogSchema
  .fork(["BlogTitle", "Content", "Category"], (field) => field.optional())
  .or("BlogTitle", "Content", "Category")
  .messages({
    "object.missing":
      "BlogTitle, Content or Category any one field is required to update",
  });