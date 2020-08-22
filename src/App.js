import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { AuthProvider } from "./Auth/AuthContext";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
        <Router>
          <>
            {/* If the user is not authenticated, he will be redirected to the login page.
            Otherwise user will enter to Home. */}
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </>
        </Router>
    </AuthProvider>
  );
};

export default App;
