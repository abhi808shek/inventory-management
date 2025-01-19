import AXIOS from "@/configs/axios.config";

export const submitDataApi = async (url: string, data: any) => {
  const response = await AXIOS.post(url, { ...data });
  return response;
};
