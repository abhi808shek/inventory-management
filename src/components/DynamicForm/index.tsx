import { FC } from "react";
import SelectUi from "@/components/select-ui";

type DynamicFormProps = {
  formData: any[];
};

const DynamicForm: FC<DynamicFormProps> = ({ formData }) => {
  const renderField = (fields: any[]) => {
    const titles = fields.filter((field) => field.title);
    const otherFields = fields.filter((field) => !field.title);

    return (
      <div>
        {titles.length > 0 && (
          <div className="flex flex-wrap gap-4 mb-2">
            {titles.map((field: any, index: number) => (
              <h2
                key={index}
                className="text-lg font-semibold flex-1 text-start"
              >
                {field.title}
              </h2>
            ))}
          </div>
        )}

        {otherFields.map((field: any, index: number) => {
          const placeholder = field.required
            ? `${field.placeholder ?? ""} *`
            : field.placeholder ?? "";

          switch (field.type) {
            case "input":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                    {field.required ? "*" : ""}
                  </label>
                  <input
                    type="text"
                    name={field.key}
                    placeholder={placeholder}
                    defaultValue={field.field_value ?? ""}
                    disabled={field.read_only}
                    required={field.required}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            case "number":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.key}
                    placeholder={placeholder}
                    defaultValue={field.field_value ?? ""}
                    required={field.required}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            case "select":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-3">
                    {field.label}
                  </label>
                  <SelectUi
                    options={field.menu}
                    placeholder={field.placeholder}
                  />
                </div>
              );
            case "text":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
                  </label>
                  <textarea
                    name={field.key}
                    placeholder={placeholder}
                    defaultValue={field.field_value ?? ""}
                    required={field.required}
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            default:
              return (
                <div key={index} className="text-red-500">
                  Unsupported field type: {field.type}
                </div>
              );
          }
        })}
      </div>
    );
  };

  const renderRow = (row: any) => {
    const columnCount = Object.keys(row).length;

    return (
      <div
        className={`grid gap-4 ${
          columnCount === 1 ? "grid-cols-1" : `grid-cols-${columnCount}`
        }`}
      >
        {Object.entries(row).map(([_, colFields], colIndex) => {
          return (
            <div
              key={colIndex}
              className={`${
                columnCount === 1 ? "col-span-full" : `col-span-1`
              }`}
            >
              {Object.entries(colFields as any).map(
                ([fieldKey, field], idx) => {
                  const label = (field as any).required
                    ? `${(field as any).label ?? ""} *`
                    : (field as any).label ?? "";
                  return (
                    <div key={fieldKey + idx}>
                      <label className="block text-sm font-medium mb-1">
                        {label}
                      </label>
                      {renderField(field as any)}
                    </div>
                  );
                }
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const renderSection = (section: any[], idx: number) => (
    <div key={idx} className="mb-6 shadow p-4 bg-white rounded">
      {section.map((row: any, rowIndex: number) => {
        return (
          <div key={rowIndex}>
            {Object.entries(row as any).map(([_, rowFields]) => {
              return renderRow(rowFields);
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-3">
      {formData.map((section: any, idx: number) =>
        Object.values(section).map((sec: any) => renderSection(sec, idx))
      )}
    </div>
  );
};

export default DynamicForm;
