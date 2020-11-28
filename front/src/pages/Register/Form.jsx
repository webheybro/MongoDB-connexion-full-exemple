import React from "react";
import { makeStyles, Paper, Box, Divider, Button } from "@material-ui/core";
import Input from "../../components/form/Input/Index";
import { useState } from "react";
import errorsVerif from "../../hooks/errorsVerif";

const useStyle = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "80px",
  },
  paper: {
    backgroundColor: "#FFFFFF",
    maxWidth: "500px",
    minWidth: "300px",
    padding: "10px",
  },
  title: {
    color: "grey",
    fontSize: "25px",
    textAlign: "center",
    textTransform: "uppercase",
    fontFamily: "Oxygen",
    fontWeight: "600",
  },
  input: {
    padding: "10px",
  },
  btn: {
    padding: "10px",
    button: {
      width: "100%",
    },
  },
  hr: {
    marginBottom: 10,
    marginTop: 10,
  },
  info: {
    fontSize: "12px",
    paddingLeft: "10px",
  },
  errors: {
    color: "red",
    paddingLeft: "10px",
    paddingRight: "10px",
    fontSize: "10px",
  },
});

function Form({ onSubmit }) {
  const classes = useStyle();
  const [state, setState] = useState({
    name: "Michel",
    email: "michel@live.fr",
    password: "exemple",
    errors: {
      message: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (
      state.errors.name ||
      state.errors.email ||
      state.errors.password ||
      state.errors.message
    ) {
      setState({
        ...state,
        errors: { message: "Des champs sont incorrects !" },
      });
      return;
    }
    //ON ENVOI les données à LAPI
    onSubmit(event);
  };

  const onHandleChange = (event) => {
    const value = event.target.value;
    const nameChange = event.target.name;
    fnErrors(nameChange, value);
    setState({ ...state, [nameChange]: value });
  };

  const fnErrors = (name, value) => {
    const format = {
      textOnly: false,
      numberOnly: false,
      min: 0,
      max: 0,
      email: false,
      same: false,
      containMaj: false,
      containMin: false,
      containNumber: false,
    };
    let errorCallback;
    let newState = {};

    switch (name) {
      case "name":
        format.textOnly = true;
        format.min = 5;
        format.max = 255;

        errorCallback = errorsVerif(value, format);
        newState = Object.assign(state);
        newState.errors.name = errorCallback;
        errorCallback && setState({ newState });
        break;

      case "email":
        format.email = true;

        errorCallback = errorsVerif(value, format);
        newState = Object.assign(state);
        newState.errors.email = errorCallback;
        errorCallback && setState({ newState });
        break;

      case "password":
        format.min = 8;
        format.containMaj = true;
        format.containMin = true;
        format.containNumber = true;

        errorCallback = errorsVerif(value, format);
        newState = Object.assign(state);
        newState.errors.password = errorCallback;
        errorCallback && setState({ newState });
        break;

      default:
        break;
    }
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h1 className={classes.title}>Register</h1>
        <Divider className={classes.hr} />

        <div className={classes.errors}>{state.errors.message}</div>

        <form onSubmit={(e) => onHandleSubmit(e)}>
          <Box className={classes.input}>
            <Input
              label="Full Name"
              name="name"
              value={state.name}
              onChange={onHandleChange}
            />
            {state.errors.name && (
              <div className={classes.errors}>{state.errors.name}</div>
            )}
          </Box>
          <Box className={classes.input}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={state.email}
              onChange={onHandleChange}
            />
            {state.errors.email && (
              <div className={classes.errors}>{state.errors.email}</div>
            )}
          </Box>
          <Box className={classes.input}>
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              value={state.password}
              onChange={onHandleChange}
            />
            {state.errors.password && (
              <div className={classes.errors}>{state.errors.password}</div>
            )}
          </Box>
          <Box className={classes.info}>
            <small>Password must be eight characters in length.</small>
          </Box>
          <Box className={classes.btn}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Je m'inscris
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Form;
