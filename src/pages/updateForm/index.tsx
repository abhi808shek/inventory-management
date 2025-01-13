import DynamicForm from "@/components/DynamicForm";
import { useSelector } from "react-redux";
const UpdateForm = () => {
  const { dynamicTableArchitecture } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  return (
    <div className="h-[calc(100svh-var(--navbar-height)-100px)] overflow-y-auto custom-scrollbar">
      <DynamicForm formData={dynamicTableArchitecture?.formBody} />
    </div>
  );
};

export default UpdateForm;
