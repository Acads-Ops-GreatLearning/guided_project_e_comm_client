import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import products from "../products";
import SearchBar from "../components/Searchbar";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import AlertMessage from "../components/AlertMessage";
import { listCategories } from "../actions/categoryActions";

const ProductsListPage = () => {
  const [productsList, setProductsList] = useState();
  const [searchbarValue, setSearchbarValue] = useState("");

  const dispatch = useDispatch();

  const listOfProducts = useSelector((state) => state.productList);
  const { loading, success, error, products } = listOfProducts;
  console.log(loading, success, error, products);

  const categoryList = useSelector(state => state.categoryList)
  const {categories} = categoryList

  useEffect(() => {
      dispatch(listProducts());
      dispatch(listCategories())
      if(products && products.length>0){
        console.log(products)
        setProductsList(products)
      }
  }, [dispatch]);

  useEffect(() =>{
    if(products && products.length>0){
      console.log(products)
      setProductsList(products)
    }
  }, [success])

  const searchProducts = (event) => {
    event.preventDefault();
    setSearchbarValue(event.target.value);
    console.log(searchbarValue);

    // products.filter((product) => {
    //   console.log(product.name.toLowerCase().includes(searchbarValue.toLowerCase()));
    // });

    let productsListFiltered = products.filter((product) => {
      if(product.name.toLowerCase().includes(searchbarValue.toLowerCase())){
        return true;
      }
      return false;
    });

    console.log(productsListFiltered);

    setProductsList(productsListFiltered);

    if (searchbarValue === "") {
      setProductsList(products);
    }
  };

  return (
    <>
      {productsList && productsList.length > 0 && <SearchBar
        handler={setSearchbarValue}
        searchBarValue={searchbarValue}
        searchProductsFunction={searchProducts}
      />}
      {loading && <AlertMessage variant="info" message="Loading..."/>}
      {productsList && productsList.length === 0 && <AlertMessage variant="info" message="No products to display"/>}
      {productsList && <Row>
        {productsList.map((product) => (
          <Col key={product._id} md={6} sm={12} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>}
    </>
  );
};

export default ProductsListPage;
