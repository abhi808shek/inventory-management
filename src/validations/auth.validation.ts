import * as Yup from "yup";

// Login Validation Schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validates the email format
    .required("Email is required"), // Ensures the field is not empty
  password: Yup.string().required("Password is required"), // Ensures the password is not empty
});

// Signup Validation Schema
export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validates the email format
    .required("Email is required"), // Ensures the field is not empty

  mobile_number: Yup.string()
    .matches(/^\d{10}$/, "Invalid phone number. It must contain 10 digits.") // Regex to validate Indian phone number
    .required("Phone number is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Ensures the password is at least 8 characters long
    .matches(/[a-z]/, "Password must contain at least one lowercase letter") // Ensures at least one lowercase letter
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter") // Ensures at least one uppercase letter
    .matches(/\d/, "Password must contain at least one number") // Ensures at least one number
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ) // Ensures at least one special character
    .required("Password is required"), // Ensures the password is not empty
});
