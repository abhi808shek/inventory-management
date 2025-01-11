import DynamicForm from "@/components/DynamicForm";
const UpdateForm = () => {
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
                  required: true,
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
                  required: true,
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
                  required: false,
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
                  required: true,
                },
              ],
            },
          ],
        },
        {
          row4: [
            {
              col1: [
                {
                  key: "address",
                  type: "text",
                  label: "Address",
                  placeholder: "Address",
                  field_value: "Kabi",
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      section2: [
        {
          row1: [
            {
              title: "Dates",
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
                  required: true,
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
                  required: true,
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
                  required: false,
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
                  required: true,
                },
              ],
            },
          ],
        },
        {
          row4: [
            {
              col1: [
                {
                  key: "address",
                  type: "text",
                  label: "Address",
                  placeholder: "Address",
                  field_value: null,
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  return (
    <div className="h-[calc(100svh-var(--navbar-height)-100px)] overflow-y-auto custom-scrollbar">
      <DynamicForm formData={formBody} />
    </div>
  );
};

export default UpdateForm;
