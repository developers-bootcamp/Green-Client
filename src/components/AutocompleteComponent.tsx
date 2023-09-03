import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';
import axios from 'axios';

interface SearchType {
  name: string;
}

interface AutocompleteComponentProps {
  path: string;
  searchType: string;
}

const AutocompleteComponent: React.FC<AutocompleteComponentProps> = ({ path, searchType }) => {
  const [dataTerm, setDataTerm] = useState<SearchType[]>([]);

  const handleSearch = async (value: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/${path}/${value}`, {
        withCredentials: true,
      });
      setDataTerm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (
    event: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') {
      handleSearch(value);
      if (value.length >= 2) {
        setTimeout(() => {
        }, 1000);
      }
    }
  };

  return (
    <Autocomplete
      disablePortal
      id="customer-autocomplete"
      options={dataTerm}
      getOptionLabel={(option) => option.name}
      value={null}
      onChange={(event, newValue) => {
      }}
      onInputChange={handleInputChange}
      sx={{ width: '15vw' }}
      renderInput={(params) => <TextField {...params} label={`${searchType}`} variant="outlined" />}
    />
  );
};

export default AutocompleteComponent;