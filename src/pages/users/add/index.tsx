import { useSelector } from "react-redux";

const AddUser = () => {
  const { dynamicTableArchitecture } = useSelector(
    (state: any) => state.dynamictableHeader
  );
  return (
    <form className="dynamic-form">
      {dynamicTableArchitecture?.formBody?.map((row: any, rowIndex: number) => (
        <div className="form-row" key={`row-${rowIndex}`}>
          {Object.entries(row).map(([key, columns]: any) =>
            columns.map((col: any, colIndex: number) => (
              <div className="form-col" key={`col-${rowIndex}-${colIndex}`}>
                {col?.map((field: any, fieldIndex: number) => (
                  <div className="form-group" key={`field-${fieldIndex}`}>
                    {field.type === "input" && (
                      <label>
                        {field.label}
                        <input
                          type="text"
                          name={field.key}
                          placeholder={field.placeholder}
                        />
                      </label>
                    )}

                    {field.type === "number" && (
                      <label>
                        {field.label}
                        <input
                          type="number"
                          name={field.key}
                          placeholder={field.placeholder}
                        />
                      </label>
                    )}

                    {field.type === "select" && (
                      <label>
                        {field.label}
                        <select name={field.key}>
                          <option value="">{field.placeholder}</option>
                          {field.menu.map((option: any) => (
                            <option key={option.id} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}

                    {field.type === "text" && (
                      <label>
                        {field.label}
                        <textarea
                          name={field.key}
                          placeholder={field.placeholder}
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddUser;
