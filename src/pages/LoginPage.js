import React, { useEffect } from "react";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";

const LoginPage = ({ history }) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [error, setError] = React.useState("");
  // const [success, setSuccess] = React.useState("");
  
  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = useSelector((state) => state.login)
  const { loading, success, error, userInfo } = userLogin
  
  console.log(loading, success, error, userInfo)

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password))
  };

  useEffect(() => {
    if(userInfo){
      window.location.replace("/")
    }
  })

  return (
    <>
      {error && <AlertMessage variant="danger" message={error} />}
      {success && <AlertMessage variant="success" message={success} />}
      <FormGroup className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="txt"
          id="username"
          placeholder="Username"
          onChange={handleUsernameChange}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
      </FormGroup>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}
        className="mb-3"
      >
        Login
      </Button>
      <Row>
        <Col className="mb-3">
          Don't have an account? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
