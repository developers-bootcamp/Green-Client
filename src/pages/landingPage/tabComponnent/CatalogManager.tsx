import React from "react"

interface prop{
    name:string|undefined,
    type:string|undefined
}
const CatalogManager:React.FC<prop>=({name,type})=>{
return(<>
    <div>{name}of {type}</div>
    <div style={{fontSize:"200%"}}>This is CatalogManager component</div>
    </>
)
}
export default CatalogManager;