import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {AutocompleteDiv, AutocompleteItem } from "./Dashboard.style";
import GenericGraph from "./GenericGraph";


const DashboardGenerator: React.FC = () => {

    const collections = ['order', 'product', 'user'];
    const groupByOrders = ['month-year', 'employee', 'customer'];
    const groupByProducts = ['month-year', 'id', 'category id'];
    const groupByUsers = ['month-year', 'role'];
    const [groupByArr, setGroupByArr] = useState<string[]>(groupByOrders);
    const [collection, setCollection] = useState<string | null>(collections[0]);
    const [groupBy, setGroupBy] = useState<string | null>(groupByArr[0]);
  
        return (
          <>
          <AutocompleteDiv>
            <AutocompleteItem>
              <label>collection</label>
                <Autocomplete
                    value={collection}
                    onChange={(event: any, newValue: string | null) => {
                      setCollection(newValue);
                      if(newValue === 'order'){
                        setGroupByArr(groupByOrders)
                        setGroupBy(groupByArr[0])
                      } 
                      else{
                        if(newValue === 'product'){
                          setGroupByArr(groupByProducts)
                          setGroupBy(groupByArr[0])
                        }
                          
                        else{
                          setGroupByArr(groupByUsers)
                          setGroupBy(groupByArr[0])
                        }
                      }
                    }}
                    id="controllable-states-demo"
                    options={collections}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
            </AutocompleteItem>
              <AutocompleteItem>
                  <label>groupBy</label>
                  <Autocomplete
                    value={groupBy}
                    onChange={(event: any, newValue: string | null) => {
                      setGroupBy(newValue);
                    }}
                    id="controllable-states-demo"
                    options={groupByArr}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
              </AutocompleteItem>
            </AutocompleteDiv>
            <GenericGraph collection = {collection} groupBy = {groupBy}/>
        </>
        );
  }
  export default DashboardGenerator