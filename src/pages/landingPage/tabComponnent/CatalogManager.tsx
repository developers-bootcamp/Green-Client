import React from "react"
import { useEffect, useState } from "react";
import GlobalTable from "../../../components/table/GlobalTable";
import { getAllCategory, deleteproductCategory, editProductCategory, addProductCategory } from "../../../apiCalls/productCategory";
import { getProducts, deleteProduct, addProduct, editProduct } from "../../../apiCalls/productCalls";
import { IProductCategory } from "../../../interfaces/model/IProductCategory";
import { IProduct } from "../../../interfaces/model/IProduct";
import arrow from '../../../images/arrow.png'
import arrow2 from '../../../images/arrow2.png'
import { PALLETE } from "../../../config/config";
import { GridPreProcessEditCellProps } from '@mui/x-data-grid';

const CatalogManager: React.FC = () => {

  const [allCategory, setAllCategory] = useState();
  const [allCategoryName, setAllCategoryName] = useState();
  const [allProduct, setallProduct] = useState();
  const [changeProductCategory, setChangeProductCategory] = useState<string>("GGG");

  const head = [{
    headerName: "Product", type: "string", field: "name", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      const hasError = params.props.value.length < 3;
      return { ...params.props, error: hasError, message: "min 3 char" };
    }
  }, {
    headerName: "Description", type: "string", field: "description", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      const hasError = params.props.value.length < 3;
      return { ...params.props, error: hasError, message: "min 3 char" };
    }
  }];
  const getAllCategoryAsync = async () => {
    await getAllCategory().then(res => {
      setAllCategory(res.data);
      setAllCategoryName(res.data.map((c: any) => { return c.name }))
    });

  }
  const productHead = [
    {
      headerName: "Name", type: "String", field: "name",
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length < 3;
        return { ...params.props, error: hasError, message: "min 3 char" };
      }

    }, {
      headerName: "Description", type: "String", field: "description", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const hasError = params.props.value.length < 3; return { ...params.props, error: hasError, message: "min 3 char" };
      }
    },
    { headerName: "Inventory", type: "number", field: "inventory", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => { const hasError = params.props.value < 0; return { ...params.props, error: hasError, message: "min value 0" } } },
    { headerName: "Discount", type: "number", field: "discount", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => { const hasError = params.props.value < 0; return { ...params.props, error: hasError, message: "min value 0" }; } },
    { headerName: "DiscountType", type: "singleSelect", field: "discountType", valueOptions: ["FIXED_AMOUNT", "PERCENTAGE"] },
    { headerName: "category", type: "singleSelect", field: "productCategoryName", valueOptions: allCategoryName },
    { headerName: "Price", type: "number", field: "price", preProcessEditCellProps: (params: GridPreProcessEditCellProps) => { const hasError = params.props.value < 0; return { ...params.props, error: hasError, message: "min value 0" }; } }
  ];

  const getAllProductAsync = async () => {
    await getProducts().then(res => setallProduct(res.data));
  }

  const onProductCategoryDelete = async (id: string) => {
    await deleteproductCategory(id).then(res => { setChangeProductCategory(id); });
  }

  const onProductCategoryEdit = async (id: string, productCategory: any) => {
    const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };
    await editProductCategory(id, newProductCategory).then(res => setChangeProductCategory(productCategory.name))
  }

  const onProductCategoryAdd = async (productCategory: any) => {
    const newProductCategory: IProductCategory = { id: productCategory.id, name: productCategory.name, description: productCategory.description };
    await addProductCategory(newProductCategory).then(res => setChangeProductCategory(newProductCategory.name))
  }

  const onProductDelete = async (id: string) => {
    await deleteProduct(id);
  }

  const onProductEdit = async (id: string, product: any) => {
    const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
    await editProduct(id, newProduct)
  }

  const onProductAdd = async (product: any) => {
    const newProduct: IProduct = { id: product.id, name: product.name, description: product.description, price: product.price, discount: product.discount, productCategoryName: product.productCategoryName, discountType: product.discountType, inventory: product.inventory };
    await addProduct(newProduct)
  }

  useEffect(() => {
    getAllProductAsync();
    getAllCategoryAsync();
  }, [changeProductCategory])

  return (
    <>
      {allCategory != null && <GlobalTable type="Product_Category" rows={allCategory} number={0} head={head} image={arrow} onDelete={onProductCategoryDelete} onEdit={onProductCategoryEdit} onAdd={onProductCategoryAdd} color={PALLETE.RED} headColor={PALLETE.RED} ></GlobalTable>}
      {allProduct != null && allCategoryName != null && <GlobalTable type="Product" rows={allProduct} number={1} head={productHead} image={arrow2} onDelete={onProductDelete} onEdit={onProductEdit} onAdd={onProductAdd} color={PALLETE.YELLOW} headColor={PALLETE.BLUE}></GlobalTable>}
    </>
  );
};

export default CatalogManager;