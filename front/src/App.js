import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import Home from "./pages/Home/Index";
import Login from "./pages/Login/Index";
import Register from "./pages/Register/Index";
import Admin from "./pages/Admin/Index";
import BottomNav from "./components/global/BottomNavbar/Index";
import axios from "axios";
import cookie from "js-cookie";

function App() {
  const [errorsLogin, setErrorsLogin] = useState({ message: "" });
  const [user, setUser] = useState({
    loggedin: false,
    infos: {},
  });

  let history = useHistory();

  const onHandleLogin = async (e) => {
    const { email, password } = e.target.elements;
    const data = {
      email: email.value,
      password: password.value,
    };
    try {
      await axios
        .post("http://localhost:3000/api/user/login", data)
        .then((response) => {
          cookie.set("token", response.data.access_token);
          setUser({ loggedin: true, infos: response.data.user });
        })
        .catch((error) => {
          setErrorsLogin({ message: "Identifiant ou mot de passe invalide !" });
        });
    } catch (error) {
      alert(error);
    }
  };

  const logout = () => {
    cookie.remove("token");
    setUser({ loggedin: false, infos: {} });
    history.push("/");
  };

  useEffect(() => {
    let token = cookie.get("token");
    //get infos by token

    async function getUser() {
      try {
        await axios
          .post("http://localhost:3000/api/user/me/", { token: token })
          .then((res) => {
            setUser({ loggedin: true, infos: res.data });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        alert(err);
      }
    }

    getUser();
  }, []);

  return (
    <>
      <BottomNav userLogged={user.loggedin} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/logout">{logout}</Route>
        <Route path="/login">
          <Login
            onLogin={onHandleLogin}
            errors={errorsLogin}
            userLogged={user.loggedin}
          />
        </Route>
        <Route path="/register">
          <Register userLogged={user.loggedin} />
        </Route>
        {user.loggedin && (
          <Route path="/admin">
            <Admin />
          </Route>
        )}
      </Switch>
    </>
  );
}

export default App;
