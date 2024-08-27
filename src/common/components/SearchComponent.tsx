import { TextField } from '@mui/material';
import { useState } from 'react';

import SearchIcon from '@mui/icons-material/Search';

interface SearchComponentProps {
  onChange: (searchTerm: string) => void;
}

const SearchComponent = ({ onChange }: SearchComponentProps) => {
  const [insideSearchTerm, setInsideSearchTerm] = useState<string>('');

  const handleOnSearchTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const searchValue = e.target.value;
    setInsideSearchTerm(searchValue);
    onChange(searchValue);
  };

  return (
    <>
      <TextField
        fullWidth
        placeholder="Search"
        autoComplete="off"
        value={insideSearchTerm}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
        onChange={handleOnSearchTextField}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
    </>
  );
};

export default SearchComponent;
