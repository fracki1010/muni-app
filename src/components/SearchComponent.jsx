import { Button, Input } from "@heroui/react";
import { Close, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterResources } from "../store/resource/resourceSlice";

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export const SearchComponent = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (search == ''){
      dispatch(filterResources(''))
    }
    }, [search])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(filterResources(search));
  };

  const handleChange = (e) => {
      setSearch(e.target.value);
  }


  return (
    <>
      {/* Versión de escritorio */}
      <div className="hidden sm:flex w-full">
      <form onSubmit={handleSubmit} className="flex items-center ">
        <Input
          placeholder="Buscar recurso..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={search}
          onChange={handleChange}
        />
      </form>
    </div>

      {/* Versión móvil */}
      <div className="sm:hidden w-full">
        <form onSubmit={handleSubmit} className="w-full">
        <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Buscar recurso..."
            size="sm"
            endContent={<SearchIcon size={18} />}
            type="search"
            value={search}
            onChange={handleChange}
          />

        </form>
      </div>
    </>
  );
};
