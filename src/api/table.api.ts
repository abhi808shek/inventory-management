import AXIOS from "../configs/axios.config";

export const DynamicTableArchitectureApi = async (
  tableName: string,
  id?: string
) => {
  const endpoint = `/portal/v1/page`;
  const params: any = { page: tableName };
  if (id) {
    params["id"] = id;
  }
  const response = await AXIOS.get(endpoint, { params });
  return response;
};
export const DynamicTableHeaderApi = async (tableName: string) => {
  const endpoint = `/portal/v1/table?table=${tableName}`;
  const response = await AXIOS.get(endpoint);
  return response;
};
export const DynamicUserTableDataApi = async (
  type: string,
  currentPage: number,
  colName?: any,
  sortingType?: any
) => {
  const params: any = {};
  if (colName) {
    params[colName] = sortingType;
  }
  params["page"] = currentPage;
  const endpoint = `/auth/v1/${type}`;
  const response = await AXIOS.get(endpoint, { params });
  return response;
};
export const DynamicWorkflowTableDataApi = async (
  type: string,
  currentPage: number,
  colName?: any,
  sortingType?: any
) => {
  const params: any = {};
  if (colName) {
    params[colName] = sortingType;
  }
  params["page"] = currentPage;
  const endpoint = `/workflow/v1/${type}`;
  const response = await AXIOS.get(endpoint, { params });
  return response;
};
