import AXIOS from "@/configs/axios.config";

export const addRole = async (tableName: string, data: any) => {
  const endpoint = `/portal/v1/table?table=${tableName}`;
  const response = await AXIOS.post(endpoint, { ...data });
  return response;
};
