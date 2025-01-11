import { FC } from "react";
import SelectUi from "@/components/select-ui";

type DynamicFormProps = {
  formData: any[];
};
// const formBody = [
//   {
//     section1: [
//       {
//         row1: [
//           {
//             title: "USER INFO",
//           },
//         ],
//       },
//       {
//         row2: [
//           {
//             col1: [
//               {
//                 key: "name",
//                 type: "input",
//                 label: "Name",
//                 placeholder: "Full Name",
//                 field_value: "John Doe",
//                 required: true,
//               },
//             ],
//           },
//           {
//             col2: [
//               {
//                 key: "email",
//                 type: "input",
//                 label: "Email",
//                 placeholder: "Email Id",
//                 field_value: "john.doe@jd.com",
//                 read_only: true,
//                 required: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         row3: [
//           {
//             col1: [
//               {
//                 key: "mobile_number",
//                 type: "number",
//                 label: "Phone (Optional)",
//                 placeholder: "Mobile Number",
//                 field_value: 9988776655,
//                 required: false,
//               },
//             ],
//           },
//           {
//             col2: [
//               {
//                 key: "role",
//                 menu: [
//                   {
//                     id: 1,
//                     value: "ADMIN",
//                   },
//                   {
//                     id: 2,
//                     value: "MANAGER",
//                   },
//                   {
//                     id: 3,
//                     value: "USER",
//                   },
//                 ],
//                 type: "select",
//                 label: "Role",
//                 placeholder: "role",
//                 field_value: 2,
//                 required: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         row4: [
//           {
//             col1: [
//               {
//                 key: "address",
//                 type: "text",
//                 label: "Address",
//                 placeholder: "Address",
//                 field_value: "Kabi",
//                 required: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     section2: [
//       {
//         row1: [
//           {
//             title: "Dates",
//           },
//         ],
//       },
//       {
//         row2: [
//           {
//             col1: [
//               {
//                 key: "name",
//                 type: "input",
//                 label: "Name",
//                 placeholder: "Full Name",
//                 field_value: "John Doe",
//                 required: true,
//               },
//             ],
//           },
//           {
//             col2: [
//               {
//                 key: "email",
//                 type: "input",
//                 label: "Email",
//                 placeholder: "Email Id",
//                 field_value: "john.doe@jd.com",
//                 read_only: true,
//                 required: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         row3: [
//           {
//             col1: [
//               {
//                 key: "mobile_number",
//                 type: "number",
//                 label: "Phone (Optional)",
//                 placeholder: "Mobile Number",
//                 field_value: 9988776655,
//                 required: false,
//               },
//             ],
//           },
//           {
//             col2: [
//               {
//                 key: "role",
//                 menu: [
//                   {
//                     id: 1,
//                     value: "ADMIN",
//                   },
//                   {
//                     id: 2,
//                     value: "MANAGER",
//                   },
//                   {
//                     id: 3,
//                     value: "USER",
//                   },
//                 ],
//                 type: "select",
//                 label: "Role",
//                 placeholder: "role",
//                 field_value: 2,
//                 required: true,
//               },
//             ],
//           },
//         ],
//       },
//       {
//         row4: [
//           {
//             col1: [
//               {
//                 key: "address",
//                 type: "text",
//                 label: "Address",
//                 placeholder: "Address",
//                 field_value: null,
//                 required: false,
//               },
//             ],
//           },
//         ],
//       },
//     ],
//   },
// ];

const DynamicForm: FC<DynamicFormProps> = ({ formData }) => {
  const renderField = (fields: any[]) => {
    return (
      <div>
        {fields.map((field: any, index: number) => {
          // Dynamically modify placeholder to include an asterisk if required
          const placeholder = field.required
            ? `${field.placeholder ?? ""} *`
            : field.placeholder ?? "";

          switch (field.type) {
            case "input":
              return (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {field.label}
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

  const renderRow = (row: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(row as any).map(([colKey, colFields]) => {
        return (
          <div key={colKey} className="col-span-1">
            {Object.entries(colFields as any).map((field: any, idx: number) => {
              const label = field[1].required
                ? `${field[1].label ?? ""} *`
                : field[1].label ?? "";
              return (
                <div key={idx} className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  {renderField(field[1])}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  const renderSection = (section: any[], idx: number) => (
    <div key={idx} className="mb-6">
      {/* Check for row1 and title in the first item */}
      {section[0]?.row1 && section[0]?.row1[0]?.title && (
        <h2 className="text-lg font-semibold mb-4">
          {section[0]?.row1[0]?.title}
        </h2>
      )}

      {/* Iterate through the section array */}
      {section.map((row: any, rowIndex: number) => {
        // Skip "row1" if it's used for the title
        if (row.row1) return null;

        // Render the remaining rows
        return (
          <div key={rowIndex} className="mb-4">
            {Object.entries(row as any).map(([_, rowFields]) => {
              return renderRow(rowFields);
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="p-4">
      {formData.map((section: any, idx: number) =>
        Object.values(section).map((sec: any) => renderSection(sec, idx))
      )}
    </div>
  );
};

export default DynamicForm;
