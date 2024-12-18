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
