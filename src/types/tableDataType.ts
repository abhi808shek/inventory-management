// Type for each "value" in the "values" array of "multi_row"
interface MultiRowValue {
  label?: string;
  value: {
    key: string;
    link?: string;
    type: "link" | "data";
    variant?: string;
    linkParams?: string[];
  };
}

// Config type for the columns
interface ColumnConfig {
  key: string | string[];
  type: "multi_row" | "data" | "link" | "status" | "dataArray";
  values?: MultiRowValue[];
  variant?: string;
  link?: string;
  linkParams?: string[];
}

// Type for each column in the `allCols` array
interface Column {
  config: ColumnConfig;
  headerName: string;
  defaultLabel?: string;
  personalisedKey?: string;
}

// Full type for `allCols`
export type AllColsType = Column[];

// Type for `role` in `sampleData`
interface Role {
  id: number;
  name: string;
  is_global: number;
  is_super_admin: number;
  is_company_admin: number;
}

// Type for each object in `sampleData`
interface DataItem {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  name: string;
  country?: number;
  phone_code?: string;
  mobile_number?: string;
  user_role?: string;
  status: number;
  status_name: string;
  role_type_id: number;
  role?: Role;
}

// Full type for `sampleData`
export type DataType = DataItem[];
