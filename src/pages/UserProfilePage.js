import React, {useEffect} from "react";
import { Form, Container, Button } from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import {useSelector, useDispatch} from 'react-redux'
import {userDetails, updateUserDetails} from '../actions/userActions'

const UserProfilePage = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("userInfo"));

  console.log(loggedInUser);

  const [username, setUserName] = React.useState(loggedInUser.username);
  const [fullname, setFullName] = React.useState(loggedInUser.fullname);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState(loggedInUser.email);

  const dispatch = useDispatch()
  const {loading, success, error, user} = useSelector(state => state.userDetails)

  const dispatchForUserUpdate = useDispatch()
  const {successUpdate, errorUpdate} = useSelector(state => state.userDetailsUpdate)

  useEffect(() => {
    if(!loggedInUser){
      window.location.replace("/login")
    } else{
      dispatch(userDetails(loggedInUser._id))
    }
  }, [dispatch])

  useEffect(() =>{
    if(success) {
      setUserName(user.username)
      setFullName(user.fullname)
      setEmail(user.email)
    }
  }, [success, successUpdate])

  

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const updateUserHandler = (e) => {
    e.preventDefault();
    
    if (password != confirmPassword) {
      errorUpdate = "Passwords do not match";
    } else if (email === "") {
      errorUpdate = "Email is required";
    } else {
      dispatchForUserUpdate(updateUserDetails(email, password, loggedInUser._id))
    }
  };
  return (
    <>
      <Container>
        {loading && <AlertMessage variant="info" message="Loading User details..."/>}
        {error && <AlertMessage variant="danger" message={error} />}
        {errorUpdate && <AlertMessage variant="danger" message={errorUpdate} />}
        {successUpdate && <AlertMessage variant="success" message={successUpdate} />}
        <Form>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              disabled
              onChange={(e) => handleUsernameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="fullname" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullname}
              disabled
              onChange={(e) => handleFullNameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="pasword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={(e) => updateUserHandler(e)}
          >
            Update Details
          </Button>
        </Form>
      </Container>

    </>
  );
};

export default UserProfilePage;
