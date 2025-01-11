import React, { useRef, useState } from "react";
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
  placeholder: string;
  options: SelectOption[];
}

const SelectUi: React.FC<SelectUiProps> = ({ placeholder, options }) => {
  const [value, setValue] = useState("");
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
          value
            ? "text-xs -top-[8px] text-[#999999]"
            : "text-gray-400 top-1/2 -translate-y-1/2"
        }`}
        onClick={handleLabelClick}
      >
        {placeholder}
      </label>
      <Select onValueChange={(value) => setValue(value)}>
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
