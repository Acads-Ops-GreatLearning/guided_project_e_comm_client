import React, { useState, useEffect } from "react";
import products from "../products";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { LinkContainer } from "react-router-bootstrap";
import { fetchProductDetails } from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";
import { saveToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  console.log(id);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, success, error, product } = productDetails;
  console.log(loading, success, product);

  const saveProductToUserCart = useSelector(
    (state) => state.saveProductToUserCart
  );
  const { addToCartLoading, addToCartSuccess, addToCartError } =
    saveProductToUserCart;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
    dispatch(listCategories());
  }, [dispatch, addToCartSuccess]);

  const quantityDropdownOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityDropdownOptions.push(<option value={i}>{i}</option>);
  }

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  function fetchCategoryName(id) {
    if (!loading && categories) {
      const category = categories.filter((category) => category._id === id);
      console.log(category);
      if (category) {
        return category[0].name;
      }
    } else {
      return "NA";
    }
  }

  // let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  // let cartItemsOfUser = cartItems.filter(
  //   (item) => item.userId === loggedInUser.id
  // );

  function checkIfItemInCart() {
    // const itemInCart = cartItemsOfUser.filter(
    //   (item) => item.id === productObject.id
    // );
    // return itemInCart;
  }

  // const selectedItemInCart = checkIfItemInCart();
  // console.log(selectedItemInCart);
  // const [itemInCart, setItemInCart] = useState(selectedItemInCart);

  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  

  const addToCartHandler = (e) => {
    if (!loggedInUser) {
      window.location.replace("/login");
    } else {
      if (product.quantityInStock <= 10) {
        dispatch(saveToCart(product._id, product.price, 1));
      } else {
        dispatch(saveToCart(product._id, product.price, selectedQuantity));
      }
    }
  };

  return (
    <>
      {loading && (
        <AlertMessage variant="info" message="Loading product details" />
      )}
      {addToCartLoading && (
        <AlertMessage
          variant="info"
          message="Product is being added to the cart"
        />
      )}
      {addToCartSuccess && (
        <AlertMessage variant="success" message={addToCartSuccess} />
      )}
      {addToCartError && (
        <AlertMessage variant="danger" message={addToCartError} />
      )}

      {/* {itemInCart != undefined && itemInCart.length > 0 && (
        <AlertMessage variant="info" message="Item is already in cart" />
      )} */}
      <LinkContainer to="/">
        <Button variant="primary" className="mb-4">
          Show All Products
        </Button>
      </LinkContainer>
      {success && product && (
        <Row>
          <Col md={4}>
            <Image src={product.image} width={300} height={300} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Description : {product.description}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Category : {fetchCategoryName(product.categoryId)}</h4>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Price : </h4>
                  </Col>
                  <Col>
                    <h4>
                      <strong>${product.price}</strong>
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Status : </h4>
                  </Col>
                  <Col>
                    <h4>
                      <strong>
                        {product.quantityInStock > 0
                          ? " Available"
                          : " Out Of Stock"}
                      </strong>
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              {product.quantityInStock > 0 && (
                <ListGroup.Item>
                  {product && product.quantityInStock <= 10 && (
                    <p class="font-italic text-danger">
                      Only {product.quantityInStock} are left.
                    </p>
                  )}
                  {product && product.quantityInStock > 10 && (
                    <Row>
                      <Col>
                        <h4>Select Quantity : </h4>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={selectedQuantity}
                          onChange={(e) => setSelectedQuantity(e.target.value)}
                        >
                          {quantityDropdownOptions}
                        </Form.Control>
                      </Col>
                    </Row>
                  )}
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.quantity === 0}
                  onClick={addToCartHandler}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
