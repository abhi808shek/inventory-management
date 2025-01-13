// import { Select } from "@shadcn-ui/react/select";
// import { SelectItem } from "@shadcn-ui/react/select-item";
// import { Input } from "@shadcn-ui/react/input";
// import { Textarea } from "@shadcn-ui/react/textarea";
const AddRole = () => {
  const formBody = [
    {
      section1: [
        {
          row1: [
            {
              title: "USER INFO",
            },
          ],
        },
        {
          row2: [
            {
              col1: [
                {
                  key: "name",
                  type: "input",
                  label: "Name",
                  placeholder: "Full Name",
                  field_value: "John Doe",
                },
              ],
            },
            {
              col2: [
                {
                  key: "email",
                  type: "input",
                  label: "Email",
                  placeholder: "Email Id",
                  field_value: "john.doe@jd.com",
                  read_only: true,
                },
              ],
            },
          ],
        },
        {
          row3: [
            {
              col1: [
                {
                  key: "mobile_number",
                  type: "number",
                  label: "Phone (Optional)",
                  placeholder: "Mobile Number",
                  field_value: 9988776655,
                },
              ],
            },
            {
              col2: [
                {
                  key: "role",
                  menu: [
                    {
                      id: 1,
                      value: "ADMIN",
                    },
                    {
                      id: 2,
                      value: "MANAGER",
                    },
                    {
                      id: 3,
                      value: "USER",
                    },
                  ],
                  type: "select",
                  label: "Role",
                  placeholder: "role",
                  field_value: 2,
                },
              ],
            },
          ],
        },
        {
          row4: [
            {
              key: "address",
              type: "text",
              label: "Address",
              placeholder: "Address",
              field_value: null,
            },
          ],
        },
      ],
    },
  ];

  return (
    <form className="dynamic-form space-y-6">
      {formBody?.map((section, sectionIndex) =>
        Object.entries(section).map(([sectionKey, rows]) =>
          rows.map((row, rowIndex) => (
            <div
              className="form-row space-y-4"
              key={`row-${sectionIndex}-${rowIndex}`}
            >
              {Object.entries(row).map(([rowKey, columns]) =>
                columns.map((col, colIndex) => (
                  <div
                    className="form-col space-y-2"
                    key={`col-${sectionIndex}-${rowIndex}-${colIndex}`}
                  >
                    {col?.map((field, fieldIndex) => (
                      <div className="form-group" key={`field-${fieldIndex}`}>
                        {field.type === "input" && (
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            <Input
                              type="text"
                              name={field.key}
                              placeholder={field.placeholder}
                              defaultValue={field.field_value}
                              readOnly={field.read_only || false}
                              required={!field.read_only}
                            />
                          </label>
                        )}

                        {field.type === "number" && (
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            <Input
                              type="number"
                              name={field.key}
                              placeholder={field.placeholder}
                              defaultValue={field.field_value}
                              required
                            />
                          </label>
                        )}

                        {field.type === "select" && (
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            <Select
                              name={field.key}
                              defaultValue={field.field_value.toString()}
                              required
                            >
                              <SelectItem value="" disabled>
                                {field.placeholder}
                              </SelectItem>
                              {field.menu.map((option) => (
                                <SelectItem
                                  key={option.id}
                                  value={option.id.toString()}
                                >
                                  {option.value}
                                </SelectItem>
                              ))}
                            </Select>
                          </label>
                        )}

                        {field.type === "text" && (
                          <label className="block text-sm font-medium text-gray-700">
                            {field.label}
                            <Textarea
                              name={field.key}
                              placeholder={field.placeholder}
                              defaultValue={field.field_value || ""}
                              required
                            />
                          </label>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          ))
        )
      )}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default AddRole;
