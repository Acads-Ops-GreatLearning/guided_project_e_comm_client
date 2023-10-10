import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";

import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAILURE,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAILURE,
} from "../constants/productActionConstants";

export const addProduct =
  (name, description, price, quantityInStock, image, categoryId) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      await axios
        .post(
          BACKEND_URL_ENDPOINT + "/api/v1/products/",
          { name, description, price, quantityInStock, image, categoryId },
          config
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({
              type: PRODUCT_CREATE_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: PRODUCT_CREATE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: PRODUCT_CREATE_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

export const deletProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .delete(BACKEND_URL_ENDPOINT + `/api/v1/products/${productId}`, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: PRODUCT_DELETE_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: PRODUCT_DELETE_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "/api/v1/products/", config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data.products,
          });
        } else {
          dispatch({
            type: PRODUCT_LIST_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: PRODUCT_LIST_FAILURE,
      payload: err.response.data.message,
    });
  }
};

export const updateProductDetails =
  (id, name, description, quantityInStock, price, categoryId, imageUrl) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

      await axios
        .put(BACKEND_URL_ENDPOINT + "/api/v1/products/" + id, {name, description, quantityInStock, price, categoryId, imageUrl}, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: res.data.message });
          } else {
            dispatch({
              type: PRODUCT_UPDATE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: PRODUCT_UPDATE_FAILURE,
        payload: err.response.data.message,
      });
    }
  };

export const fetchProductDetails = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_DETAILS_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "/api/v1/products/" + productId, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data.product });
        } else {
          dispatch({ type: PRODUCT_DELETE_FAILURE, payload: res.data.message });
        }
      });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAILURE,
      payload: err.response.data.message,
    });
  }
};
