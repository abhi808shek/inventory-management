import AXIOS from "@/configs/axios.config";

// Login Api Async Function
export const loginApi = async (loginCredentential: any) => {
  const endpoint = "/login";
  const result = await AXIOS.post(endpoint, loginCredentential);
  return result;
};

// Singup Api Async Function
export const signupApi = async (signupCredentential: any) => {
  const endpoint = "/registration";
  const result = await AXIOS.post(endpoint, signupCredentential);
  return result;
};
