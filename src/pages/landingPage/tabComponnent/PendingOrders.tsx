import React from "react"

interface prop{
    name:string|undefined,
    type:string|undefined
}
const PendingOrders:React.FC<prop>=({name,type})=>{
return(<>
    <div>{name}of {type}</div>
    <div style={{fontSize:"200%",color:"black"}}>This is PendingOrders component</div>
</>)
}
export default PendingOrders;
