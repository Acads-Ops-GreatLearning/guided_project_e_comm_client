import axios from "axios";
import { BACKEND_URL_ENDPOINT } from "../constants/backend";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILURE,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_UPDATE_FAILURE,
  USER_LIST_SUCCESS,
  USER_LIST_FAILURE,
  USER_LIST_REQUEST,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILURE,
  USER_REGISTER_FAILURE,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
} from "../constants/userActionConstants";

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .post(
        BACKEND_URL_ENDPOINT + "/api/v1/users/login",
        { username, password },
        config
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.userData,
            success: res.data.message,
          });
          localStorage.setItem("userInfo", JSON.stringify(res.data.userData));
        } else {
          console.log(res);
          dispatch({
            type: LOGIN_FAILURE,
            error: res.data.error,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGIN_FAILURE,
          error: err.message,
        });
      });

    // console.log(response);
    // dispatch({ type: LOGIN_SUCCESS, payload: response, message: response });
    // localStorage.setItem("userInfo", JSON.stringify(response));
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOGIN_FAILURE,
      error: err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  console.log("Inside Logout Function");
  try {
    dispatch({ type: LOGOUT_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    console.log(userInfo.sessionToken);

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    console.log(config)

    await axios
      .get(BACKEND_URL_ENDPOINT + "/api/v1/users/logout", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data.message,
          });
          localStorage.removeItem("userInfo");
          window.location.replace("/login");
        } else {
          dispatch({
            type: LOGOUT_FAILURE,
            pyload: res.data.error,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOGOUT_FAILURE,
          payload: err.message,
        });
      });
  } catch (err) {
    dispatch({
      type: LOGOUT_FAILURE,
      payload: err.message,
    });
  }
};

export const registerUser =
  (username, fullname, email, password, isAdmin) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
      await axios
        .post(
          BACKEND_URL_ENDPOINT + "/api/v1/users/",
          { username, fullname, email, password, isAdmin },
          config
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch({
              type: USER_REGISTER_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: USER_REGISTER_FAILURE,
              payload: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: USER_REGISTER_FAILURE,
            payload: err.message,
          });
        });
    } catch (err) {
      console.log(err);
      dispatch({
        type: USER_REGISTER_FAILURE,
        payload: err.message,
      });
    }
  };

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        Authorization: `Bearer ${userInfo.sessionToken}`,
      },
    };

    await axios
      .delete(BACKEND_URL_ENDPOINT + `/api/v1/users/${userId}`, config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: USER_DELETE_SUCCESS,
            payload: res.data.message,
          });
        } else {
          dispatch({
            type: USER_DELETE_FAILURE,
            payload: res.data.message,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: USER_DELETE_FAILURE,
          payload: err.message,
        });
      });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAILURE,
      payload: err.message,
    });
  }
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.sessionToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
      },
    };

    await axios
      .get(BACKEND_URL_ENDPOINT + "/api/v1/users/", config)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          dispatch({
            type: USER_LIST_SUCCESS,
            payload: res.data.users,
          });
        } else {
          dispatch({
            type: USER_LIST_FAILURE,
            payload: res.data.message,
          });
        }
      });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAILURE,
      payload: err.message,
    });
  }
};

export const userDetails =
  (userId = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("Inside userDetails function : ", userInfo);
      if (!userId) {
        userId = userInfo._id;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };

      console.log(config);

      await axios
        .get(BACKEND_URL_ENDPOINT + "/api/v1/users/" + userId, config)
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: USER_DETAILS_SUCCESS,
              payload: res.data,
            });
          } else {
            dispatch({
              type: USER_DETAILS_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: USER_DETAILS_FAILURE,
        payload: err.message,
      });
    }
  };

export const updateUserDetails =
  (email, password, userId) => async (dispatch) => {
    try {
      dispatch({
        type: USER_DETAILS_UPDATE_REQUEST,
      });

      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userId) {
        userId = userInfo._id;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.sessionToken}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };

      await axios
        .put(
          BACKEND_URL_ENDPOINT + "/api/v1/users/" + userId,
          { email: email, password: password },
          config
        )
        .then((res) => {
          if (res.status === 200) {
            dispatch({
              type: USER_DETAILS_UPDATE_SUCCESS,
              payload: res.data.message,
            });
          } else {
            dispatch({
              type: USER_DETAILS_UPDATE_FAILURE,
              payload: res.data.message,
            });
          }
        });
    } catch (err) {
      dispatch({
        type: USER_DETAILS_UPDATE_FAILURE,
        payload: err.message,
      });
    }
  };
