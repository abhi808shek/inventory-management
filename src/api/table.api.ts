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
export const DynamicUserTableDataApi = async (type: string) => {
  const endpoint = `/auth/v1/${type}`;
  const response = await AXIOS.get(endpoint);
  return response;
};
export const DynamicWorkflowTableDataApi = async (type: string) => {
  const endpoint = `/workflow/v1/${type}`;
  const response = await AXIOS.get(endpoint);
  return response;
};
