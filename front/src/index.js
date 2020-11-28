import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/Index.css";
import { BrowserRouter as Router } from "react-router-dom";
import cookie from "js-cookie";
import jwt from "jsonwebtoken";

const jwt_token = ""; //Ajouter token identique à l'api
let token = cookie.get("token");
if (token) {
  jwt.verify(token, jwt_token, (err, decoded) => {
    if (err) {
      cookie.remove("token");
      token = null;
    } else {
      /*
            if (decoded.iss !== 'http://localhost:3000/api/user/login'){
                cookie.remove("token");
                token=null;
            }
            */
    }
  });
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
