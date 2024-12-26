import AXIOS from "@/configs/axios.config";

// Get User Api Async Function
export const getUserData = async () => {
  const endpoint = "/auth/v1/user";
  const result = await AXIOS.get(endpoint);
  return result;
};
