import * as Yup from "yup";

// Login Validation Schema
export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validates the email format
    .required("Email is required"), // Ensures the field is not empty
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Ensures the password is at least 8 characters long
    .required("Password is required"), // Ensures the password is not empty
});

// Signup Validation Schema
export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address") // Validates the email format
    .required("Email is required"), // Ensures the field is not empty
  phoneNumber: Yup.string()
    .min(10, "Invalid phone number. It must contain 10 digits.") // Regex to validate Indian phone number
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters") // Ensures the password is at least 8 characters long
    .required("Password is required"), // Ensures the password is not empty
});
