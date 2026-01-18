import React, { useEffect, useState } from "react";
import useDebouncedValue from "app/hooks/useDebounceValue.ts";
import { Search } from "lucide-react";
import cls from "./SearchInput.module.scss";

interface SearchInputProps {
  placeholder?: string;
  initialValue?: string;
  debounceMs?: number;
  className?: string;
  onChange?: (v: string) => void;
  onDebounced?: (v: string) => void;
  clearable?: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Поиск...",
  initialValue = "",
  debounceMs = 500,
  onChange,
  onDebounced,
  clearable = true,
}) => {
  const [value, setValue] = useState<string>(initialValue);
  const debounced = useDebouncedValue(value, debounceMs);

  useEffect(() => {
    // можно вот так сократить: onChange?.(value);
    if (onChange) onChange(value);
  }, [value]);

  useEffect(() => {
    // можно вот так сократить: onDebounced?.(debounced);
    if (onDebounced) onDebounced(debounced);
  }, [debounced]);

  return (
    <div className={cls.searchInputWrap}>
      <Search className={cls.search} />
      <input
        className={cls.searchInput}
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search"
      />
      {clearable && value && (
        <button
          type="button"
          className={cls.searchClearBtn}
          onClick={() => setValue("")}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
