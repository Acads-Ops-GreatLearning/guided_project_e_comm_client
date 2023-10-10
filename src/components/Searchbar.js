import React from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import "./Searchbar.css";

const SearchBar = (props) => {
  return (
    <>
      <Container>
        <Row className="center-align">
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              id="productname"
              value={props.searchBarValue}
              onChange={(e) => props.handler(e.target.value)}
            />
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              onClick={props.searchProductsFunction}
            >
              <i class="bi bi-search"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SearchBar;
