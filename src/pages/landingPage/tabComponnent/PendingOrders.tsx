import React, { useEffect, useState } from "react"
import { IOrder } from "../../../interfaces/IOrder"
import { IUser } from "../../../interfaces/IUser"
import { Button, Popover, Typography } from "@material-ui/core"
import { string } from "yup"

interface prop {
    name: string | undefined,
    type: string | undefined
}
const PendingOrders: React.FC<prop> = ({ name, type }) => {

    let x = [] as IOrder[];
    const [sortBy, setSortBy] = useState(0)

    const [data, setData] = useState([] as IOrder[])
    const choose = (value: any) => {
        setSortBy(value)
        sort();

    }
    const sort = () => {
        debugger
        var a = [...data];
        if (sortBy == 0)
           { a.sort((a, b) => { return a.customerId.fullName > b.customerId.fullName ? 1 : 0 })
        console.log(a)}
        else
          {  a.sort((a, b) => { return Object.values(a)[sortBy] - Object.values(b)[sortBy] })
        console.log(a)}
        setData(a);
        console.log(data)
    }
    useEffect(() => {
        let c: IUser = {
            id: "1",
            fullName: "mmm",
            password: "111",
            addressId: undefined,
            roleId: undefined,
            companyId: undefined,
            auditData: undefined
        }
        let tmp: IOrder = {
            employeeId: undefined,
            customerId: c,
            totalAmount: 10,
            orderItemsList: [],
            orderStatus: "",
            companyId: undefined,
            creditCardNumber: "",
            expiryOn: new Date(),
            cvc: "",
            notificationFlag: false,
            auditData: undefined,
            currency: ""
        }

        let c2: IUser = {
            id: "2",
            fullName: "bbb",
            password: "222",
            addressId: undefined,
            roleId: undefined,
            companyId: undefined,
            auditData: undefined
        }
        let tmp2: IOrder = {
            employeeId: undefined,
            customerId: c2,
            totalAmount: 0,
            orderItemsList: [],
            orderStatus: "",
            companyId: undefined,
            creditCardNumber: "",
            expiryOn: new Date(),
            cvc: "",
            notificationFlag: false,
            auditData: undefined,
            currency: ""
        }
        x.push(tmp)
        x.push(tmp2)
        setData(x)
    }, [])

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    let o: IOrder = {
        employeeId: undefined,
        customerId: {} as IUser,
        totalAmount: 0,
        orderItemsList: [],
        orderStatus: "",
        companyId: undefined,
        creditCardNumber: "",
        expiryOn: new Date,
        cvc: "",
        notificationFlag: false,
        auditData: undefined,
        currency: ""
    }
    return (<>
        <Button variant="contained" onClick={handleClick}>
            Open Popover
        </Button>
        <Popover
            //   id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
        //   anchorOrigin={{
        //     vertical: 'bottom',
        //     horizontal: 'left',
        //   }}
        >
            <Typography >
                sort by <select onChange={(e) => { choose(e.target.value) }}>
                    {Object.keys(o).map((e, i) => <option value={i}>{e}</option>)}
                </select>
            </Typography>
        </Popover>
        <div>{name}of {type}</div>
        <div>
            <ul>
                {data.map(e => <li>{JSON.stringify(e)}</li>)}
            </ul>
        </div>


    </>
    )
}
export default PendingOrders;
