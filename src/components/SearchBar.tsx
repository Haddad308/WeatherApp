import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import useDebounce from "../hooks/useDebounce";

interface SearchBarProps {
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce<string>(searchText, 1500);

  useEffect(() => {
    setSearchQuery(debouncedSearchText);
  }, [debouncedSearchText, setSearchQuery]);

  return (
    <Input
      placeholder="Search by city.."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;
