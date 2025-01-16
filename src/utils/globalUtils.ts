export const modifiedFieldList = (all_cols: any) => {
  const modifiedList = all_cols?.map((item: any) => ({
    name: item?.headerName,
    key: item?.config?.key,
  }));
  return modifiedList;
};
