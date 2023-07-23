import React from "react"

interface prop{
    name:string|undefined,
    type:string|undefined
}
const Dashboard:React.FC<prop>=({name,type})=>{
return(<>
    <div>{name}of {type}</div>
    <div style={{fontSize:"200%",color:"black"}}>This is Dashboard component</div>
</>)
}
export default Dashboard;