import React, { useRef, useState } from "react";
import UPLOAD_IMAGE from "@/assets/images/image 86.png";
import QR_IMAGE from "@/assets/images/qr_image.png";
import BAR_CODE_IMAGE from "@/assets/images/bar_code_image.png";
import SCANNER_IMAGE from "@/assets/images/scan_image.png";
import { Separator } from "@/components/ui/separator";
import MultiInput from "@/components/MultiInput";
import { ChevronDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import SHIELD_ICON from "@/assets/images/shield_icon.svg";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];
// type MenuOption = {
//   id: number;
//   value: string;
// };

// type FormField = {
//   label?: string;
//   type:
//     | "input"
//     | "select"
//     | "number"
//     | "decimal"
//     | "text"
//     | "multi-input"
//     | "multi-upload"
//     | "qr"
//     | "barcode"
//     | "scan";
//   placeholder?: string | number;
//   menu?: MenuOption[];
//   max?: number; // For multi-upload max files
// };

// type SectionTitle = {
//   title: string;
// };

// type FormElement = FormField | SectionTitle;

// type FormRow = FormElement[];

// type FormBody = FormRow[][];

// type FormData = {
//   "form-top": FormField[];
//   "form-body": FormBody;
// };

const formData: any = {
  "form-top": [
    {
      label: "",
      type: "input",
      placeholder: "Item Name",
    },
    {
      label: "",
      type: "select",
      placeholder: "Add to Folder",
      menu: [
        {
          id: 1,
          value: "Folder1",
        },
        {
          id: 2,
          value: "Folder2",
        },
        {
          id: 3,
          value: "Folder3",
        },
      ],
    },
  ],
  "form-body": [
    [
      [
        [
          {
            title: "ITEM DETAILS",
          },
        ],
        [
          {
            label: "Quantity",
            type: "number",
            placeholder: 1,
          },
          {
            label: "Unit of Measure",
            type: "select",
            placeholder: "unit",
            menu: [
              {
                id: 1,
                value: "Box",
              },
              {
                id: 2,
                value: "Pound",
              },
              {
                id: 3,
                value: "Kilogram",
              },
            ],
          },
        ],
        [
          {
            label: "Min Level",
            type: "number",
            placeholder: "0",
          },
          {
            label: "Price",
            type: "decimal",
            placeholder: "0",
          },
        ],
        [
          {
            label: "Tags",
            type: "multi-input",
            placeholder: "",
          },
        ],
      ],
      [
        [
          {
            title: "PHOTOS",
          },
        ],
        [
          {
            label: "",
            type: "multi-upload",
            placeholder: "",
            max: 8,
          },
        ],
      ],
    ],
    [
      [
        [
          {
            label: "Notes",
            type: "text",
            placeholder: "",
          },
        ],
      ],
      [
        [
          {
            title: "QR / BARCODES",
          },
        ],
        [
          {
            type: "qr",
          },
          {
            type: "barcode",
          },
          {
            type: "scan",
          },
        ],
      ],
    ],
  ],
};

export const InputField = ({
  label = "Label",
  placeholder = "Placeholder",
  type = "text",
}) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleLabelClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Focus the select element
      inputRef.current.click(); // Simulate a click to open the dropdown
    }
  };

  return (
    <div className="relative w-full">
      {/* Label inside the border */}
      <label
        className={`text-sm absolute left-2 px-1 bg-white transition-all ${
          focused || value
            ? "text-[12px] -top-2 text-[#999999]"
            : "text-gray-400 top-1/2 -translate-y-1/2"
        }`}
        onClick={handleLabelClick}
      >
        {label}
      </label>
      {/* Input field */}
      <input
        ref={inputRef}
        type={type}
        className="border border-gray-300 rounded-md px-2 pt-2 pb-1 w-full focus:outline-none  placeholder:text-xs"
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

const FloatingTextArea = ({ label = "Label", placeholder = "Placeholder" }) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleLabelClick = () => {
    if (textAreaRef.current) {
      textAreaRef.current.focus(); // Focus the select element
      textAreaRef.current.click(); // Simulate a click to open the dropdown
    }
  };

  return (
    <div className="relative w-full">
      {/* Floating Label */}
      <label
        className={`text-sm absolute left-2 px-1 bg-white transition-all ${
          focused || value
            ? "text-sm -top-2 text-[#999999]"
            : "text-gray-400 top-3"
        }`}
        onClick={handleLabelClick}
      >
        {label}
      </label>
      {/* Text Area */}
      <textarea
        ref={textAreaRef}
        className="border border-gray-300 rounded-md p-2 pt-6 w-full focus:outline-none placeholder:text-xs"
        placeholder={focused ? placeholder : ""}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
      />
    </div>
  );
};

const FloatingSelect = ({ label = "Label", options = [] }: any) => {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleLabelClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
    }
  };

  return (
    <div className="relative w-full">
      <label
        className={`text-sm absolute left-2 px-1 bg-white transition-all z-10 ${
          focused || value
            ? "text-sm -top-2 text-[#999999]"
            : "text-gray-400 top-1/2 -translate-y-1/2"
        }`}
        onClick={handleLabelClick}
      >
        {label}
      </label>
      <div className="relative">
        <select
          ref={selectRef}
          className="appearance-none border border-gray-300 rounded-md px-2 pt-2 pb-1 w-full focus:outline-none placeholder:text-xs z-30"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <option value="" disabled hidden></option>
          {options.map((option: any) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="absolute top-1/2 right-2 w-5 h-5 text-gray-400 pointer-events-none transform -translate-y-1/2" />
      </div>
    </div>
  );
};

const FormRenderer: React.FC = () => {
  return (
    <div className="container bg-white rounded-sm shadow-xl mx-auto p-4 pt-6 h-[calc(100svh-var(--navbar-height)-100px)] overflow-y-auto custom-scrollbar">
      {/* Form Top Section */}
      <div className="flex justify-between mb-2 px-1">
        {formData["form-top"].map((element: any, index: any) => (
          <div className="w-[150px]">
            <FormField key={index} element={element} />
          </div>
        ))}
      </div>
      <Separator className="w-full text-[#EDEDED] mb-6" />
      {/* Form Body Section */}
      {formData["form-body"].map((section: any, sectionIndex: any) => (
        <div key={sectionIndex} className="flex gap-3 justify-between">
          {section.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className="mb-4 flex-1 max-w-[48%]">
              {row.map((element: any, elementIndex: any) => (
                <div
                  key={elementIndex}
                  className={`flex gap-3 justify-between ${
                    element.some(
                      (childElem: any) => childElem.type === "multi-upload"
                    )
                      ? "h-[80%]"
                      : ""
                  }`}
                >
                  {element.map((childElem: any) => {
                    return (
                      <div
                        className={`flex flex-1  ${
                          childElem.type === "multi-upload"
                            ? "mb-2 h-full"
                            : childElem.title
                            ? "mb-2"
                            : "mb-6 h-max"
                        }`}
                      >
                        {childElem.title && (
                          <h2 className="text-sm font-semibold mb-2 text-[#6A7682]">
                            {childElem.title}
                          </h2>
                        )}
                        {childElem.type && <FormField element={childElem} />}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <div className="flex items-center space-x-2 gap-3">
        <Label htmlFor="" className="text-[#768898] font-[14px]">
          This item has variants
        </Label>
        <div className="flex gap-1">
          <Switch id="airplane-mode" className="h-4 w-9" />
          <img src={SHIELD_ICON} />
        </div>
      </div>
      <div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2 text-[#6A7682]">
            Custom Fields
          </h2>
          <div className="flex">
            <div className="flex mr-6 gap-1">
              <img src={SHIELD_ICON} />
              <div className="text-[#768898] font-normal">Add new fields</div>
            </div>
            <div className="flex gap-1">
              <img src={SHIELD_ICON} />
              <div className="text-[#768898] font-normal">
                Manage custom fields
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FormField: React.FC<{ element: any }> = ({ element }) => {
  const [multiInputValues, setMultiInputValues] = useState<
    { input: string; option: string }[]
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      console.log("Selected files:", files);
    }
  };

  switch (element.type) {
    case "input":
      return (
        <input
          className="border-b-2 border-[#999999] bg-transparent p-1 pb-0 focus:outline-none placeholder:font-normal w-[200px]"
          placeholder={String(element.placeholder)}
        />
      );
    case "select":
      return (
        // <select className="border rounded p-2 w-[200px]">
        //   {element.menu?.map((option) => (
        //     <option key={option.id} value={option.value}>
        //       {option.value}
        //     </option>
        //   ))}
        // </select>
        <FloatingSelect
          label={String(element.placeholder)}
          options={element.menu ?? []}
        />
      );
    case "number":
      return (
        // <input
        //   type="number"
        //   className="border rounded p-2 w-full"
        //   placeholder={String(element.placeholder)}
        // />
        <InputField
          type="number"
          label={String(element.label)}
          placeholder={String(element.placeholder)}
        />
      );
    case "decimal":
      return (
        // <input
        //   type="number"
        //   step="0.01"
        //   className="border rounded p-2 w-full"
        //   placeholder={String(element.placeholder)}
        // />
        <InputField
          type="number"
          label={String(element.label)}
          placeholder={String(element.placeholder)}
        />
      );
    case "multi-input":
      return (
        // <input
        //   className="border rounded p-2 w-full"
        //   placeholder={String(element.placeholder)}
        // />
        <MultiInput
          values={multiInputValues}
          options={options}
          onChange={(values: any) => setMultiInputValues(values)}
        />
      );
    case "multi-upload":
      return (
        <div
          className="flex cursor-pointer items-center justify-center w-full max-w-[500px] h-full bg-[#F0F0F0] border border-[#999999] rounded-lg"
          onClick={handleDivClick}
        >
          <div className="flex flex-col items-center justify-center">
            <img src={UPLOAD_IMAGE} width={50} height={50} />
          </div>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      );
    case "qr":
      return (
        <div className="qr-placeholder">
          <img src={QR_IMAGE} className="h-full cursor-pointer" />
        </div>
      );
    case "barcode":
      return (
        <div className="barcode-placeholder">
          <img src={BAR_CODE_IMAGE} className="h-full cursor-pointer" />
        </div>
      );
    case "scan":
      return (
        <div className="scan-placeholder">
          <img src={SCANNER_IMAGE} className="h-full cursor-pointer" />
        </div>
      );
    case "text":
      return (
        // <textarea
        //   className="border rounded p-2 w-full"
        //   placeholder={String(element.placeholder)}
        // />
        <FloatingTextArea
          label={String(element.label)}
          placeholder={String(element.placeholder)}
        />
      );
    default:
      return null;
  }
};

export default FormRenderer;
