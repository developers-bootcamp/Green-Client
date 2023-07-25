
import { useState } from "react"

import { log } from "console";
import { Autocomplete, TextField } from "@mui/material";
import { string } from "yup";
interface prp {

    getFunction: (prefix: string) => Promise<{ [key: string]: any; }[]>
    setItem: any
    displayField: number
}


function MyAutocomplete(props: prp) {
    const [data, setData] = useState([] as { [key: string]: any }[])
    const [data2, setData2] = useState({} as { [key: string]: string })

    const [input, setInput] = useState("")
    const complete = () => {
        setTimeout(() => getData2(), 1000)

    }
    const getData = async () => {
        if (input.length >= 1) {
            const ans = await props.getFunction(input)
            let DataFromServer: { [key: string]: any }[] = [] as { [key: string]: any }[];
            DataFromServer = await props.getFunction(input);
            setData(DataFromServer);
        }
    }

    const getData2 = async () => {
        if (input.length >= 1) {
            let DataFromServer: { [key: string]: any } = {} as { [key: string]: any };
            DataFromServer = await props.getFunction(input);
      
            setData2(DataFromServer);
            let x = [{ id: "z1", name: "try" }];
            Object.entries(DataFromServer).forEach(e => { const p = { id: e[0], name: e[1] }; x.push(p) })
            setData(x)
        }
    }

    const chosenValue = (chosen: { [key: string]: any } | null) => {
      
        if (chosen != null)
            props.setItem(chosen)

    }

    return <>

        <Autocomplete onChange={(event, value) => { chosenValue(value) }} options={data} 
        getOptionLabel={(option: { [key: string]: any }): string => {
            return option.name;
        }
        }

            renderInput={(params) => <TextField onChange={(event) => { setInput(event.target.value); complete() }}
                variant="outlined" {...params} />}></Autocomplete>
    </>
}
export default MyAutocomplete;