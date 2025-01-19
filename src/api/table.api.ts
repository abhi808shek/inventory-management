import { portalList } from "@/assets/data/routeOptions";
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
export const DynamicTableHeaderApi = async (
  tableName: string,
  key?: string,
  value?: boolean
) => {
  const params: any = {};
  if (key) {
    params[key] = value;
  }
  const endpoint = `/portal/v1/table?table=${tableName}`;
  const response = await AXIOS.get(endpoint, { params });
  return response;
};
export const DynamicUserTableDataApi = async (
  type: string,
  currentPage: number,
  colName: string | string[] = "",
  sortingType: string = "",
  searchInput: string = ""
) => {
  const params: any = {};
  if (colName && typeof colName === "string") {
    params[colName] = sortingType;
  }
  if (searchInput) {
    params["search"] = searchInput;
  }
  params["page"] = currentPage;
  const endpoint =
    location.pathname === "/items" ? `/portal/v1/${type}` : `/auth/v1/${type}`;
  const response = await AXIOS.get(endpoint, { params });
  return response;
};
export const DynamicWorkflowTableDataApi = async (
  type: string,
  currentPage: number,
  colName: string = "",
  sortingType: string = "",
  searchInput: string = ""
) => {
  const params: any = {};
  if (colName) {
    params[colName] = sortingType;
  }
  if (searchInput) {
    params["search"] = searchInput;
  }
  params["page"] = currentPage;
  const endpoint = `/workflow/v1/${type}`;
  const response = await AXIOS.get(endpoint, { params });
  return response;
};

export const DynamicDeleteTableDatabyIdApi = async (
  page: string,
  id: number
) => {
  console.log("Page", page);

  let portal: string = "";
  // Determine portal based on location.pathname
  for (const path in portalList) {
    if (location.pathname.startsWith(path)) {
      portal = portalList[path];
      break; // Exit loop once a match is found
    }
  }
  const endpoint = `/${portal}/v1/${page}/${id}`;
  const response = await AXIOS.delete(endpoint);
  return response;
};
