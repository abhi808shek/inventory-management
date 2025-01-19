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
  value: string | number;
}

interface SelectUiProps {
  placeholder?: string;
  options?: SelectOption[];
  onHandleChange?: (value: string | number) => void;
}

const SelectUi: React.FC<SelectUiProps> = ({
  placeholder,
  options,
  onHandleChange,
}) => {
  const [value, setValue] = useState<string | number>("");

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    if (onHandleChange) onHandleChange(newValue);
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
            <SelectItem key={option.id} value={String(option.value)}>
              {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectUi;
