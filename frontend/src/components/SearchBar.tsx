import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export type Props = {
  identificationNumber: string;
  name: string;
  handleSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleQuery: () => Promise<void>;
};

const SearchBar: React.FC<Props> = ({
  identificationNumber,
  name,
  handleSearchQuery,
  handleQuery,
}) => {
  return (
    <div className="mb-10 flex w-full items-center gap-2">
      <Input
        type="text"
        onChange={handleSearchQuery}
        name="identificationNumber"
        placeholder="Identication Number"
        value={identificationNumber}
        className="w-full border-b-[1px] border-white bg-transparent font-mono text-white dark:border-black dark:text-black"
      />

      <Input
        type="text"
        onChange={handleSearchQuery}
        name="name"
        placeholder="Name"
        value={name}
        className="w-full border-b-[1px] border-white bg-transparent font-mono text-white dark:border-black dark:text-black"
      />

      <Button
        onClick={handleQuery}
        variant="outline"
        className="w-full bg-transparent font-mono text-white dark:border-black dark:text-black"
      >
        <p>Search</p>
      </Button>
    </div>
  );
};

export default SearchBar;
