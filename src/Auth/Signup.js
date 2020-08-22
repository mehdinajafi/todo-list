import React, { useCallback } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import fbase from "../firebase.js";
import '../styles/auth-styles/forms.css';

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await fbase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp} className="form-box">
      <h1>signup</h1>
        <label>
        Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
        Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Signup</button>
        <p>Are you already a member? <Link to="./login">Login</Link></p>
      </form>
    </div>
  );
};

export default withRouter(SignUp);
