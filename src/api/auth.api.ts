import AXIOS from "@/configs/axios.config";

interface LOGIN_DATA_TYPE {
  email: string;
  password: string;
}

interface SIGNUP_DATA_TYPE extends LOGIN_DATA_TYPE {
  mobile_number: string;
}

// Login Api Async Function
export const loginApi = async (loginCredentential: LOGIN_DATA_TYPE) => {
  const endpoint = "/login";
  const result = await AXIOS.post(endpoint, loginCredentential);
  return result;
};

// Singup Api Async Function
export const signupApi = async (signupCredentential: SIGNUP_DATA_TYPE) => {
  const endpoint = "/registration";
  const result = await AXIOS.post(endpoint, signupCredentential);
  return result;
};
