import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import UPLOAD_IMAGE from "@/assets/images/image 86.png";
import { InputField, FloatingTextArea } from "@/pages/addItem";
import SelectUi from "@/components/select-ui";
import QR_IMAGE from "@/assets/images/Frame 1000000965.png";
import BAR_CODE_IMAGE from "@/assets/images/fileds.png";
import PLUS_ICON_IMAGE from "@/assets/images/Frame 1000000978.png";
import SCANNER_IMAGE from "@/assets/images/image 87.png";
import { Info, X } from "lucide-react";
import { notification } from "@/configs/notification.config";

const options = [
  { value: "Option 1", id: "option1" },
  { value: "Option 2", id: "option2" },
  { value: "Option 3", id: "option3" },
  { value: "Option 4", id: "option4" },
  { value: "Option 5", id: "option5" },
  { value: "Option 6", id: "option6" },
];

const UpdateItem: FC = () => {
  const [name, setName] = useState("");
  const [folderName, setFolderName] = useState<any>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedBarCode, setSelectedBarCode] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(false);
  const [selectedScanner, setSelectedScanner] = useState(false);
  const [chips] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<any>("");
  const [minLevel, setMinLevel] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [value, setValue] = useState<any>("");
  const [notes, setNotes] = useState<any>("");
  const [combinationsData, setCombinationsData] = useState([]);

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

  console.log(value, combinationsData, folderName);
  console.log(folderName);
  console.log(combinationsData);

  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setSelectedImages((prevSelectedImages) => [
        ...prevSelectedImages,
        ...files,
      ]);
    } else {
      notification.error("You can only select a maximum of 8 images ");
    }
  };

  const addImage = (setterFn: (val: any) => void, isSelected = true) => {
    setterFn(isSelected);
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
    setCombinationsData(data);
  }, [chips, quantity, minLevel, price, notes]);

  return (
    <div className="p-6 pt-0 pb-4 mb-16 bg-white rounded shadow-md h-full overflow-hidden overflow-y-auto relative custom-scrollbar">
      <div className="sticky bg-white z-20 top-0 pt-6 pb-3 flex justify-between w-full gap-5">
        <input
          className="border-b-2 border-[#999999] bg-transparent p-1 pb-0 focus:outline-none placeholder:font-normal w-[200px]"
          placeholder="New Role"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <div className="w-56">
          <SelectUi
            placeholder="Select Type"
            options={options}
            onHandleChange={(newVal) => setFolderName(newVal)}
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
            {LEFT_FIELDS.map((field, index) => (
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
            <div className="w-full h-full max-h-60 bg-[#F0F0F0] border border-[#999999] rounded-lg p-2">
              {/* Image Grid */}
              <div className="grid grid-cols-4 gap-4 h-full w-full">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-center bg-[#F0F0F0] border border-[#999999] rounded-lg h-[50%] w-full"
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index + 1}`}
                      className="w-full object-cover rounded-lg h-full"
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
                    className="flex cursor-pointer items-center justify-center w-full h-[50%] max-h-60 bg-[#F0F0F0] border-2 border-dashed border-[#999999] rounded-lg"
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
                      onClick={() => addImage(setSelectedQRCode)}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedQRCode, false)} // Pass index to handleDelete
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
                      onClick={() => addImage(setSelectedBarCode)}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedBarCode, false)} // Pass index to handleDelete
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
                      onClick={() => addImage(setSelectedScanner)}
                    />
                  </div>
                ) : (
                  <button
                    className="absolute h-5 w-5 text-[12px] flex items-center justify-center top-[-10px] right-[-10px] bg-gray-300 p-2 rounded-full shadow-md"
                    onClick={() => addImage(setSelectedScanner, false)} // Pass index to handleDelete
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
      </div>
    </div>
  );
};

export default UpdateItem;
