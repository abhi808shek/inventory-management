import AXIOS from "../configs/axios.config";

export const DynamicTableArchitectureApi = async (tableName: string) => {
  const endpoint = `/portal/v1/page?page=${tableName}`;
  const response = await AXIOS.get(endpoint);
  return response;
};
export const DynamicTableHeaderApi = async (tableName: string) => {
  const endpoint = `/portal/v1/table?table=${tableName}`;
  const response = await AXIOS.get(endpoint);
  return response;
};
export const DynamicTableDataApi = async () => {
  const endpoint = `/auth/v1/user`;
  const response = await AXIOS.get(endpoint);
  return response;
};
