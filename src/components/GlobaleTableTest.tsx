import { useEffect, useState } from "react";
import GlobalTable from "./GlobalTable";
import{getAllCategory}from"../axios/ProductCategoryAxios";
function createData(id: string, product: string, description: string) {
    return { id, product, description };
  }
  const rows = [
    createData('1', 'Cupcake', '305'),
    createData('2', 'Donut', '452'),
    createData('3', 'Eclair', '262'),
    createData('4', 'Frozen yoghurt', '159'),
    createData('5', 'Gingerbread', '356'),
    createData('6', 'Honeycomb', '408'),
    createData('7', 'Ice cream sandwich', '237'),
    createData('8', 'Jelly Bean', '375'),
    createData('9', 'KitKat', '518'),
    createData('10', 'Lollipop', '392'),
    createData('11', 'Marshmallow', '318'),
    createData('12', 'Nougat', '360'),
    createData('13', 'Oreo', '437'),
  ].sort((a, b) => (a.product < b.product ? -1 : 1));
const GlobalTableTest = () => {
    const head=["product","Description","Edit"];
    const[allCategory,setAllCategory]=useState();
    const getAllCategoryAsync=async()=>{
        await getAllCategory().then(res=>setAllCategory(res.data));
        console.log(allCategory);
        
      }
      useEffect(()=>{
        getAllCategoryAsync();
      },[])
  return (
    <>
    {allCategory!=null&&<GlobalTable rows={allCategory}rowsDescription={["id","name","description"]}head={head}></GlobalTable>}
    </>
  );
};
export default GlobalTableTest;