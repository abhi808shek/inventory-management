import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import UPLOAD_IMAGE from "@/assets/images/image 86.png";
import { InputField, FloatingTextArea } from "@/pages/addItem";
import SelectUi from "@/components/select-ui";
import QR_IMAGE from "@/assets/images/Frame 1000000965.png";
import BAR_CODE_IMAGE from "@/assets/images/fileds.png";
import PLUS_ICON_IMAGE from "@/assets/images/Frame 1000000978.png";
import SCANNER_IMAGE from "@/assets/images/image 87.png";
import { Check, Info, Plus, Trash2, X } from "lucide-react";
import { notification } from "@/configs/notification.config";
import { useDispatch, useSelector } from "react-redux";
import { addItemSetter } from "@/store/items/item-reducer";

const options = [
  { value: "Option 1", id: "option1" },
  { value: "Option 2", id: "option2" },
  { value: "Option 3", id: "option3" },
  { value: "Option 4", id: "option4" },
  { value: "Option 5", id: "option5" },
  { value: "Option 6", id: "option6" },
];

const ItemForm: FC = () => {
  const [name, setName] = useState("");
  const [folderName, setFolderName] = useState<any>("");
  const [hasVariants, setHasVariants] = useState(false);
  const [attributes, setAttributes] = useState<
    { field: string; options: any[] }[]
  >([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedBarCode, setSelectedBarCode] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(false);
  const [selectedScanner, setSelectedScanner] = useState(false);
  const [chips, setChips] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<any>("");
  const [minLevel, setMinLevel] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [_, setValue] = useState<any>("");
  const [notes, setNotes] = useState<any>("");
  const [combinationsData, setCombinationsData] = useState([]);

  const { addItemObject } = useSelector((state: any) => state.itemReducer);

  const dispatch = useDispatch();

  const LEFT_FIELDS = [
    {
      label: "QUANTITY",
      type: "number",
      variant: "input",
      width: "w-[44%]",
      required: true,
      setterFn: setQuantity,
    },

    {
      label: "MIN LEVEL",
      type: "number",
      variant: "input",
      width: "w-[44%]",
      required: true,
      setterFn: setMinLevel,
    },
    {
      label: "PRICE",
      type: "number",
      variant: "input",
      width: "w-[44%]",
      required: true,
      setterFn: setPrice,
    },
    {
      label: "VALUE",
      type: "number",
      variant: "input",
      width: "w-[44%]",
      required: true,
      setterFn: setValue,
    },
    {
      label: "NOTES",
      type: "text",
      variant: "textfield",
      width: "w-full",
      setterFn: setNotes,
    },
  ];

  console.log("addItemObject", addItemObject);
  console.log("addItemObject", folderName);
  console.log("addItemObject", _);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const addAttribute = () => {
    if (attributes?.length >= 5) {
      notification.error("Attribute can not be more than 5");
      return;
    }
    setAttributes([...attributes, { field: "", options: [] }]);
  };

  const handleKeyDown = (event: any, index: number) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      if (inputValue[index]?.trim() !== "") {
        const newChips = JSON.parse(JSON.stringify(chips));
        const oldChips = newChips[index] ?? [];
        if (oldChips?.length >= 10) {
          notification.error("Variants can not be more than 10");
          return;
        }
        newChips[index] = [...oldChips, inputValue[index]?.trim() ?? ""];
        setChips(newChips);
        setInputValue([]);
      }
    }
  };

  const handleInputChange = (event: any, index: number) => {
    const newInput = JSON.parse(JSON.stringify(inputValue));
    newInput[index] = event.target.value;
    setInputValue(newInput);
  };

  const handleChipDelete = (index: number) => {
    setChips(chips.filter((_, chipIndex) => chipIndex !== index));
  };

  const removeAttribute = (index: number) => {
    const updatedAttributes = attributes.filter((_, i) => i !== index);
    const newChips = chips.filter((_, i) => i !== index);
    const newInputValue = inputValue.filter((_, i) => i !== index);
    setAttributes(updatedAttributes);
    setChips(newChips);
    setInputValue(newInputValue);
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (!files) {
      return;
    }
    const totalFiles = selectedImages.length + files.length;

    if (totalFiles <= 8) {
      setSelectedImages((prevState) => {
        if (addItemObject.items?.length) {
          const items = addItemObject.items.map((item: any) => {
            return { ...item, image: [...prevState, ...files] };
          });
          dispatch(addItemSetter({ ...addItemObject, items }));
        } else {
          const items = [{ image: [...prevState, ...files] }];
          dispatch(addItemSetter({ ...addItemObject, items }));
        }
        return [...prevState, ...files];
      });
    } else {
      notification.error("You can only select a maximum of 8 images");
    }
  };

  const addImage = (
    setterFn: (val: any) => void,
    code: string = "",
    isSelected = true
  ) => {
    setterFn(isSelected);
    if (code !== "") {
      if (addItemObject.items?.length) {
        const items = addItemObject.items.map((item: any) => {
          return { ...item, [code]: isSelected };
        });
        dispatch(addItemSetter({ ...addItemObject, items }));
      } else {
        const items = [{ image: isSelected }];
        dispatch(addItemSetter({ ...addItemObject, items }));
      }
    }
    // dispatch(addItemSetter({ ...addItemObject, items: prevState }));
  };

  const handleDelete = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
  };

  const generateCombinations = (arrays: any) => {
    if (arrays.length === 0) return [[]];
    const [first, ...rest] = arrays;
    const combinations = generateCombinations(rest);
    return first.flatMap((value: any) =>
      combinations.map((combination: any) => [value, ...combination])
    );
  };

  const handleSelectAll = (event: any) => {
    let prevState = JSON.parse(JSON.stringify(combinationsData));
    prevState = prevState.map((data: any) => {
      return { ...data, isSelected: event.target.checked };
    });
    setCombinationsData(prevState);
    dispatch(addItemSetter({ ...addItemObject, items: prevState }));
  };

  const checkAllSelected = () => {
    return combinationsData.every((data: any) => data.isSelected);
  };

  const handleChange = (event: any, fieldName: string, mainIndex: number) => {
    let prevState = JSON.parse(JSON.stringify(combinationsData));

    prevState = prevState.map((data: any, index: number) => {
      if (mainIndex === index) {
        return { ...data, [fieldName]: event.target.value };
      }
      return data;
    });

    setCombinationsData(prevState);
    dispatch(addItemSetter({ ...addItemObject, items: prevState }));
  };

  const handleVariantCheck = (event: any, mainIndex: number) => {
    let prevState = JSON.parse(JSON.stringify(combinationsData));

    prevState = prevState.map((data: any, index: number) => {
      if (mainIndex === index) {
        return { ...data, isSelected: event.target.checked };
      }
      return data;
    });

    setCombinationsData(prevState);
    dispatch(addItemSetter({ ...addItemObject, items: prevState }));
  };

  const combinations = generateCombinations(chips);

  useEffect(() => {
    const data = combinations.map((combination: any) => ({
      isSelected: true,
      variant: combination.join(" X "),
      quantity: quantity,
      minLevel: minLevel,
      price: price,
      value: Number(quantity) * Number(price),
      notes: notes,
      code1: selectedBarCode,
      code2: selectedQRCode,
      variants: combination,
      image: selectedImages,
    }));
    dispatch(addItemSetter({ ...addItemObject, items: data }));
    setCombinationsData(data);
  }, [chips, quantity, minLevel, price, notes]);

  return (
    <div className="p-6 pt-0 pb-4 mb-16 bg-white rounded shadow-md h-full overflow-hidden overflow-y-auto relative custom-scrollbar">
      <div className="sticky bg-white z-20 top-0 pt-6 pb-3 flex justify-between w-full gap-5">
        <input
          className="border-b-2 border-[#999999] bg-transparent p-1 pb-0 focus:outline-none placeholder:font-normal w-[200px]"
          placeholder="New Role"
          value={name}
          onChange={(event) => {
            dispatch(
              addItemSetter({ ...addItemObject, name: event.target.value })
            );
            setName(event.target.value);
          }}
        />
        <div className="w-56">
          <SelectUi
            placeholder="Select Type"
            options={options}
            onHandleChange={(newVal) => {
              dispatch(addItemSetter({ ...addItemObject, folder: newVal }));
              setFolderName(newVal);
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mb-6 mt-6 justify-between">
        {/* Left Section */}
        <div className="flex flex-wrap w-full md:w-[48%]  flex-col">
          <label className="text-[#6A7682] block mb-2 font-semibold">
            Item Details
          </label>
          <div className="flex flex-wrap gap-4 justify-between w-full mb-6">
            {LEFT_FIELDS.map((field: any, index: number) => (
              <div className={`relative ${field.width}`} key={index}>
                {field.variant === "input" && (
                  <InputField
                    type={field.type}
                    label={field.label + `${field.required ? " *" : ""}`}
                    onHandleChange={(event: any) =>
                      field.setterFn(event.target.value)
                    }
                  />
                )}
                {field.variant === "textfield" && (
                  <FloatingTextArea
                    type={field.type}
                    label={field.label + `${field.required ? " *" : ""}`}
                    onHandleChange={(event: any) =>
                      field.setterFn(event.target.value)
                    }
                  />
                )}
                {field.variant === "select" && (
                  <SelectUi
                    // label={field.label + `${field.required ? " *" : ""}`}
                    options={options}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Variants Toggle */}
          <div className="flex items-center gap-2 mb-6">
            <label className="text-[#768898] font-normal text-[14px]">
              This item has variants
            </label>
            <button
              onClick={() => {
                if (hasVariants) {
                  setAttributes([]);
                  setChips([]);
                  setInputValue([]);
                  setCombinationsData([]);
                }
                setHasVariants(!hasVariants);
              }}
              className={`w-[30px] h-[16px] flex items-center rounded-full p-1 transition ${
                hasVariants ? "bg-[#5159b8]" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-[10px] h-[10px] rounded-full shadow-md transform transition ${
                  hasVariants ? "translate-x-[14px]" : ""
                }`}
              ></div>
            </button>
            <Info width={14} height={14} color="#999999" />
          </div>
          <div>
            {hasVariants && (
              <div className="mb-6">
                <label className="text-[#6A7682] block mb-2 font-semibold">
                  Attributes and Options
                </label>
                {attributes.map((_, mainIndex: any) => (
                  <div className="flex items-center gap-4 mb-4" key={mainIndex}>
                    <div className="relative w-1/2">
                      <InputField label="Variant" />
                    </div>
                    <div className="relative w-1/2">
                      <div className="flex items-center flex-wrap border border-gray-300 rounded-md px-2 py-1">
                        {chips[mainIndex]?.map((chip: any, index: number) => (
                          <div
                            key={index}
                            className="bg-[#f6f7f9] text-[#4C5C6B] text-[14px] font-normal px-3 py-1 rounded flex items-center mr-2 mb-1"
                          >
                            {chip}
                            <button
                              className="ml-2 text-[#4C5C6B]"
                              onClick={() => handleChipDelete(index)}
                            >
                              <X width={12} height={12} />
                            </button>
                          </div>
                        ))}
                        <input
                          type="text"
                          placeholder={
                            (!chips[mainIndex] ||
                              chips[mainIndex]?.length === 0) &&
                            (!inputValue[mainIndex] ||
                              inputValue[mainIndex] === "")
                              ? "Options (comma separated)"
                              : ""
                          }
                          className="flex-grow min-w-[50px] border-none focus:ring-0 focus:outline-none py-1"
                          value={inputValue[mainIndex] ?? ""}
                          onChange={(event) =>
                            handleInputChange(event, mainIndex)
                          }
                          onKeyDown={(event) => handleKeyDown(event, mainIndex)}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAttribute(mainIndex)}
                      className="border-[1px] border-[#D8DDE3] h-10 w-10 flex justify-center items-center rounded"
                    >
                      <Trash2 width={14} height={14} color="#999999" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addAttribute}
                  className="text-[#768898] flex flex-wrap items-center text-[14px] font-normal gap-1"
                >
                  <Plus width={14} height={14} /> Add Attribute
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Section - Add Image and QR/Barcode */}
        <div className="w-full h-full md:w-[44%] space-y-2 pb-3">
          <label className="text-[#6A7682] block font-semibold">Photos</label>
          {/* Add Image */}
          {!selectedImages.length ? (
            <div
              className="flex cursor-pointer items-center justify-center w-full h-60 bg-[#F0F0F0] border border-[#999999] rounded-lg"
              onClick={handleDivClick}
            >
              <div className="flex flex-col items-center justify-center">
                <img src={UPLOAD_IMAGE} width={50} height={50} />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </div>
          ) : (
            <div className="w-full h-60 max-h-60 bg-[#F0F0F0] border border-[#999999] rounded-lg p-2">
              {/* Image Grid */}
              <div className="grid grid-cols-4 gap-4 h-full w-full">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center bg-[#F0F0F0] border border-[#999999] rounded-lg !h-20 w-full"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index + 1}`}
                      className="w-full rounded-lg h-full"
                    />
                    <button
                      className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-2 right-2 bg-white p-2 rounded-full shadow-md"
                      onClick={() => handleDelete(index)} // Pass index to handleDelete
                    >
                      <X />
                    </button>
                  </div>
                ))}
                {selectedImages.length < 8 ? (
                  <div
                    className="flex cursor-pointer items-center justify-center w-full !h-20 max-h-60 bg-[#F0F0F0] border-2 border-dashed border-[#999999] rounded-lg"
                    onClick={handleDivClick}
                  >
                    <div className="flex flex-col items-center justify-center">
                      <img src={UPLOAD_IMAGE} width={20} height={20} />
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* QR / Barcode */}
          <div className="!mt-8">
            <label className="block mb-2 font-semibold text-[#6A7682]">
              QR / Barcodes
            </label>
            <div className="flex gap-4 flex-wrap justify-between">
              <div className="qr-placeholder relative">
                <img src={QR_IMAGE} className="h-[90px]" />
                {!selectedQRCode ? (
                  <div className="absolute inset-0 rounded bg-black bg-opacity-50 flex justify-center items-center">
                    <img
                      src={PLUS_ICON_IMAGE}
                      className="cursor-pointer"
                      onClick={() => addImage(setSelectedQRCode, "code1")}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedQRCode, "code1", false)} // Pass index to handleDelete
                  >
                    <X />
                  </button>
                )}
              </div>
              <div className="relative barcode-placeholder">
                <img src={BAR_CODE_IMAGE} alt="Barcode" className="h-[90px]" />
                {!selectedBarCode ? (
                  <div className="absolute inset-0 rounded bg-black bg-opacity-50 flex justify-center items-center">
                    <img
                      src={PLUS_ICON_IMAGE}
                      className="cursor-pointer"
                      onClick={() => addImage(setSelectedBarCode, "code2")}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedBarCode, "code2", false)} // Pass index to handleDelete
                  >
                    <X />
                  </button>
                )}
              </div>
              <div className="scan-placeholder relative">
                <img src={SCANNER_IMAGE} className="h-[90px]" />
                {!selectedScanner ? (
                  <div className="absolute inset-0 rounded bg-black bg-opacity-50 flex justify-center items-center">
                    <img
                      src={PLUS_ICON_IMAGE}
                      className="cursor-pointer"
                      onClick={() => addImage(setSelectedScanner, "")}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedScanner, "", false)} // Pass index to handleDelete
                  >
                    <X />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Custom Fields */}
          <div className="!mt-8">
            <label className="block mb-2 font-semibold text-[#6A7682]">
              Custom Fields
            </label>
            <div className="flex gap-4">
              <button className="flex flex-wrap items-center text-[14px] font-normal gap-1 text-[#768898]">
                <Info width={14} height={14} color="#999999" />
                Add new fields
              </button>
              <button className="flex flex-wrap items-center text-[14px] font-normal gap-1 text-[#768898]">
                <Info width={14} height={14} color="#999999" />
                Manage custom fields
              </button>
            </div>
          </div>
        </div>
        {combinations.flat(Infinity).length ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="table-auto w-full">
              <thead>
                <tr className="bg-[#f5f6f7]">
                  <th className="p-2 flex gap-2 w-[250px] sticky left-0">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={checkAllSelected()}
                        onChange={handleSelectAll}
                        className="hidden peer"
                      />
                      <div
                        className={`w-5 h-5 flex items-center border-[1px] border-[#D7D7DD] rounded bg-white peer-checked:bg-[#5159B8] peer-checked:border-[#5159B8] relative`}
                      >
                        <Check
                          className="absolute inset-0 m-auto text-white peer-checked:block peer-checked:text-white"
                          size={16}
                        />
                      </div>
                    </label>
                    VARIANT
                  </th>
                  <th className="p-2 w-[150px]">QUANTITY</th>
                  <th className="p-2 w-[250px]">MIN LEVEL</th>
                  <th className="p-2 w-[150px]">PRICE</th>
                  <th className="p-2 w-[150px]">VALUE</th>
                  <th className="p-2 w-[200px]">NOTES</th>
                  <th className="p-2 w-[200px]">QR</th>
                  <th className="p-2 w-[200px]">BARCODE</th>
                </tr>
              </thead>
              <tbody>
                {combinationsData.map((combination: any, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="flex gap-4 p-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={combination.isSelected}
                          onChange={(event) => {
                            handleVariantCheck(event, index);
                          }}
                          className="hidden peer"
                        />
                        <div
                          className={`w-5 h-5 flex items-center border-[1px] border-[#D7D7DD] rounded bg-white peer-checked:bg-[#5159B8] peer-checked:border-[#5159B8] relative`}
                        >
                          <Check
                            className="absolute inset-0 m-auto text-white peer-checked:block peer-checked:text-white"
                            size={16}
                          />
                        </div>
                      </label>
                      {combination.variant}
                      <div className="qr-placeholder relative">
                        <img
                          src={
                            selectedImages[selectedImages.length - 1]
                              ? URL.createObjectURL(
                                  selectedImages[selectedImages.length - 1]
                                )
                              : ""
                          }
                          className="h-5 w-5"
                        />
                        <button
                          className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                          onClick={() => addImage(setSelectedQRCode, "", false)} // Pass index to handleDelete
                        >
                          <X />
                        </button>
                      </div>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={combination.quantity}
                        onChange={(e) => handleChange(e, "quantity", index)}
                        className="w-full border border-[#D1D1D1] focus:outline-none p-1"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={combination.minLevel}
                        onChange={(e) => handleChange(e, "minLevel", index)}
                        className="w-full border border-[#D1D1D1] focus:outline-none p-1"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={combination.price}
                        onChange={(e) => handleChange(e, "price", index)}
                        className="w-full border border-[#D1D1D1] focus:outline-none p-1"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        disabled
                        value={
                          Number(combination.quantity) *
                          Number(combination.price)
                        }
                        // onChange={(e) => handleChange(e, "minLevel", index)}
                        className="w-full border border-[#D1D1D1] focus:outline-none p-1"
                      />
                    </td>
                    <td className=" p-2">
                      <input
                        type="text"
                        value={combination.notes}
                        onChange={(e) => handleChange(e, "notes", index)}
                        className="w-full border-[1px] border-[#D1D1D1] focus:outline-none p-1"
                      />
                    </td>
                    <td className=" p-2 text-center">
                      <div className="qr-placeholder relative">
                        <img src={QR_IMAGE} className="h-10 w-full" />
                        <button
                          className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                          onClick={() => addImage(setSelectedQRCode, "", false)} // Pass index to handleDelete
                        >
                          <X />
                        </button>
                      </div>
                    </td>
                    <td className=" p-2 text-center">
                      <div className="qr-placeholder relative">
                        <img src={BAR_CODE_IMAGE} className="h-10 w-full" />
                        <button
                          className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                          onClick={() => addImage(setSelectedQRCode, "", false)} // Pass index to handleDelete
                        >
                          <X />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ItemForm;
