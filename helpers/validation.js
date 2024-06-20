const joi = require("joi");

const Login = joi.object({
  email: joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please enter a valid email address",
  }),
  password: joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

const category = joi.object({
  name: joi.string().required().messages({
    "string.empty": "The name field is required.",
  }),
});

const brand = joi.object({
  name: joi.string().required().messages({
    "string.empty": "name is required.",
  }),
  logo: joi.string().required().messages({
    "string.empty": "logo is required.",
  }),
});

const brandArray = joi.array().items(brand);

// FAQ
const faq = joi.object({
  question: joi.string().required().messages({
    "string.empty": "Question is required.",
  }),
  answer: joi.string().required().messages({
    "string.empty": "Answer is required.",
  }),
});

const faqArray = joi.array().items(faq);

// Banner
const banner = joi.object({
  title: joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  desc: joi.string().required().messages({
    "string.empty": "Description is required.",
  })
});

// Blog
const blog = joi.object({
  title: joi.string().required().messages({
    "string.empty": "Title is required.",
  }),
  content: joi.string().required().messages({
    "string.empty": "Content is required.",
  }),
  image: joi.string().required().messages({
    "string.empty": "Image is required.",
  }),
});

// ContactUs
const contactus = joi.object({
  name: joi.string()
    .pattern(/^[a-zA-Z\s]+$/) // Regular expression to allow only letters and spaces
    .required()
    .messages({
      "string.empty": "Name is required.",
      "string.pattern.base": "Name can only contain letters.",
    }),
  email: joi.string().email().required().messages({
    "string.empty": "Email is required.",
    "string.email": "Please enter a valid email address.",
  }),
  contact: joi.string() // Ensure contact is a string to validate properly
    .pattern(/^\d{10}$/) // Regular expression to allow only digits
    .required()
    .messages({
      "string.empty": "Contact number is required.",
      "string.pattern.base": "Contact number must be exactly 10 digits.",
    }),
});

// Contact
const contact = joi.object({
    company_name:joi.string().required().messages({
        "string.empty": "Company Name is required.",
      }),
    email: joi.string().email().required().messages({
      "string.empty": "Email is required.",
      "string.email": "Please enter a valid email address.",
    }),
    contact: joi.string() // Ensure contact is a string to validate properly
      .pattern(/^\d{10}$/) // Regular expression to allow only digits
      .required()
      .messages({
        "string.empty": "Contact number is required.",
        "string.pattern.base": "Contact number must be exactly 10 digits.",
      }),
      address:joi.string().required().messages({
        "string.empty": "Address Name is required.",
      })
  });

module.exports = {
  Login,
  category,
  brand,
  brandArray,
  faq,
  faqArray,
  banner,
  blog,
  contactus,
  contact
};
