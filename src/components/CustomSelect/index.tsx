import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectOption {
  id: string | number;
  name: string | number;
}

interface SelectUiProps {
  placeholder?: string;
  options?: SelectOption[];
  onHandleChange?: (option: SelectOption) => void;
}

const CustomSelectUi: React.FC<SelectUiProps> = ({
  placeholder,
  options,
  onHandleChange,
}) => {
  const [value, setValue] = useState<string | number>("");

  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options?.find(
      (option) => String(option.name) === selectedValue
    );

    if (selectedOption) {
      setValue(selectedOption.name);
      if (onHandleChange) onHandleChange(selectedOption);
    }
  };

  return (
    <div className="relative w-full">
      <label
        className={`cursor-pointer text-sm absolute left-2 px-1 bg-white transition-all z-10 ${
          value
            ? "text-xs -top-[8px] text-[#999999]"
            : "text-gray-400 top-1/2 -translate-y-1/2"
        }`}
        onClick={(e) => {
          const triggerElement = e.currentTarget.parentElement?.querySelector(
            "[data-state='closed']"
          ) as HTMLElement;
          if (triggerElement) {
            triggerElement.click(); // Simulates a click on the `SelectTrigger` to open the dropdown
          }
        }}
      >
        {placeholder}
      </label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full h-10 pt-2 pb-2 outline-none">
          <SelectValue placeholder="" />
        </SelectTrigger>
        <SelectContent>
          {options?.map((option) => (
            <SelectItem key={option.id} value={String(option.name)}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelectUi;
