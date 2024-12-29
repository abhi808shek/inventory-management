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
  console.log("loginCredentential", loginCredentential);

  const endpoint = "/auth/v1/login";
  console.log("AXIOS", await AXIOS.get(""));
  console.log("endpoint", endpoint);

  const result = await AXIOS.post(endpoint, loginCredentential);
  console.log("result", result);

  return result;
};

// Singup Api Async Function
export const signupApi = async (signupCredentential: SIGNUP_DATA_TYPE) => {
  const endpoint = "/auth/v1/registration";
  const result = await AXIOS.post(endpoint, signupCredentential);
  return result;
};
