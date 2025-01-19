import { Switch } from "@/components/ui/switch";
import { useState } from "react";
const SwitchUi = ({ item, tableDataHandle, tableHeaderHandler }: any) => {
  console.log("item", item);

  const [isTableFieldEnable, setIsTableFieldEnable] = useState(true);
  const onHandleTableField = (checked: any) => {
    console.log("key Insde");
    tableHeaderHandler(item?.key, checked);
    // tableDataHandle();
    setIsTableFieldEnable(checked);
  };
  return (
    <div className="flex items-center space-x-2 h-5">
      <Switch
        checked={isTableFieldEnable}
        onCheckedChange={onHandleTableField}
      />
    </div>
  );
};
export default SwitchUi;
