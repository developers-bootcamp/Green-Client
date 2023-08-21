import React, { useState, ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { AutocompleteInputChangeReason } from '@mui/material/Autocomplete';

interface Customer {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
}

export default function NewOrderModal() {
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');

  const customerList: Customer[] = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Alex Johnson' },
  ];

  const productList: Product[] = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' },
    { id: 3, name: 'Product C' },
  ];

  const handleCustomerInputChange = (
    event: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') {
      setCustomerSearchTerm(value);
      if (value.length >= 2) {
        setTimeout(() => {
   
        }, 1000);
      }
    }
  };

  const handleProductInputChange = (
    event: ChangeEvent<{}>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    if (reason === 'input') {
      setProductSearchTerm(value);
      if (value.length >= 2) {
        setTimeout(() => {
       
        }, 1000);
      }
    }
  };

  return (
    <div>
      <Autocomplete<Customer>
        disablePortal
        id="customer-autocomplete"
        options={customerList}
        getOptionLabel={(customer) => customer.name}
        value={null} 
        onChange={(event, newValue) => {
         
        }}
        onInputChange={handleCustomerInputChange}      
        sx={{width:'15vw'}}
        renderInput={(params) => (
          <TextField {...params} label="Customer" variant="outlined" />
        )}
      />
      <br />
      <Autocomplete<Product>
        disablePortal
        id="product-autocomplete"
        options={productList}
        getOptionLabel={(product) => product.name}
        value={null} 
        onChange={(event, newValue) => {
       
        }}
        onInputChange={handleProductInputChange}
        sx={{width:'15vw'}}
        renderInput={(params) => (
          <TextField {...params} label="Product" variant="outlined" />
        )}
      />
    </div>
  );
}
