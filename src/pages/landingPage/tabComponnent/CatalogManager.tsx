import React from "react"
import { useEffect, useState } from "react";
import GlobalTable from "../../../components/table/GlobalTable";
import { getAllCategory, deleteproductCategory, editProductCategory, addProductCategory } from "../../../apiCalls/productCategory";
import { getProducts, deleteProduct, addProduct, editProduct } from "../../../apiCalls/productCalls";
import { idText } from "typescript";
import { IProductCategory } from "../../../interfaces/model/IProductCategory";
import { IProduct } from "../../../interfaces/model/IProduct";
import { GridPreProcessEditCellProps } from "@mui/x-data-grid";
import arrow from '../../../images/arrow.png'
import arrow2 from '../../../images/arrow2.png'
import { PALLETE } from "../../../config/config";

interface prop {
  name: string | undefined,
  type: string | undefined
}
const CatalogManager: React.FC<prop> = ({ name, type }) => {

  

  const [allCategory, setAllCategory] = useState();
  const [allCategoryName, setAllCategoryName] = useState();

  const [allProduct, setallProduct] = useState();
  const [changeProductCategory, setChangeProductCategory] = useState<string>("GGG");
  const head = [{ headerName: "Product", type: "string", field: "name" }, { headerName: "Description", type: "string", field: "description" }];
  const getAllCategoryAsync = async () => {
    await getAllCategory().then(res => {
      setAllCategory(res.data);
      setAllCategoryName(res.data.map((c:any)=>{return c.name} ))  
    });

  }
  const productHead = [{ headerName: "Name", type: "String", field: "name",preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
    const hasError = params.props.value.length < 3;
    return { ...params.props, error: hasError };
  }, }, { headerName: "Description", type: "String", field: "description" }, { headerName: "Inventory", type: "number", field: "inventory" }, { headerName: "Discount", type: "number", field: "discount" }, { headerName: "DiscountType", type: "singleSelect", field: "discountType",valueOptions:["FIXED_AMOUNT","PERCENTAGE"] }, { headerName: "category", type: "singleSelect", field: "productCategoryName",valueOptions: allCategoryName }, { headerName: "Price", type: "number", field: "price" }];

  const getAllProductAsync = async () => {
    await getProducts().then(res => setallProduct(res.data));
    ;
  }
  const onProductCategoryDelete = async (id: string) => {

    await deleteproductCategory(id).then(res => { setChangeProductCategory(id); console.log(res.data) });
  }
  const onProductCategoryEdit = async (id: string, productCategory: any) => {
    const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };


    console.log(id, "catelog manager");

    await editProductCategory(id, newProductCategory).then(res=>setChangeProductCategory(productCategory.name))
  
  }
  const onProductCategoryAdd = async (productCategory: any) => {
    const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };
    console.log(" addcatelog manager");

    await addProductCategory(newProductCategory).then(res=>setChangeProductCategory(newProductCategory.name))
  }
  const onProductDelete = async (id: string) => {

    await deleteProduct(id).then(res => console.log(res.data));
  }
  const onProductEdit = async (id: string, product: any) => {
    const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
    console.log(id,product, "catelog manager");
    await editProduct(id, newProduct)
  }
  const onProductAdd = async (product: any) => {
    const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
    console.log(newProduct," addcatelog manager");

    await addProduct(newProduct)
  }
  useEffect(() => {
    getAllProductAsync();
    getAllCategoryAsync();
  }, [changeProductCategory])
  return (
    <>
          {allCategory != null && <GlobalTable type="Product_Category" rows={allCategory}number={0} head={head}image={arrow} onDelete={onProductCategoryDelete} onEdit={onProductCategoryEdit} onAdd={onProductCategoryAdd} color={PALLETE.RED}headColor={PALLETE.RED} ></GlobalTable>}
      {allProduct != null && allCategoryName != null&&<GlobalTable type="Product" rows={allProduct}number={1}  head={productHead}image={arrow2} onDelete={onProductDelete} onEdit={onProductEdit} onAdd={onProductAdd} color={PALLETE.YELLOW}headColor={PALLETE.BLUE}></GlobalTable>}

    </>
  );
};
export default CatalogManager;

