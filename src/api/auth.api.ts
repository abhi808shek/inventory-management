import AXIOS from "@/configs/axios.config";

export const loginApi = async (loginCredentential: any) => {
  const endpoint = "/login";
  const result = await AXIOS.post(endpoint, loginCredentential);
  return result;
};
