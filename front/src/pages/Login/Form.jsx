import React from "react";
import { makeStyles, Paper, Box, Divider, Button } from "@material-ui/core";
import Input from "../../components/form/Input/Index";
import { useState } from "react";

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

function Form({ onSubmit, errors }) {
  const classes = useStyle();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const onHandleSubmit = (event) => {
    event.preventDefault();
    onSubmit(event);
  };

  const onHandleChange = (event) => {
    const value = event.target.value;
    const nameChange = event.target.name;
    setState({ ...state, [nameChange]: value });
  };
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <h1 className={classes.title}>Log In</h1>
        <Divider className={classes.hr} />

        <div className={classes.errors}>{errors.message}</div>

        <form onSubmit={(e) => onHandleSubmit(e)}>
          <Box className={classes.input}>
            <Input
              label="Email"
              name="email"
              type="email"
              value={state.email}
              onChange={onHandleChange}
            />
          </Box>
          <Box className={classes.input}>
            <Input
              label="Mot de passe"
              name="password"
              type="password"
              value={state.password}
              onChange={onHandleChange}
            />
          </Box>
          <Box className={classes.btn}>
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Connexion
            </Button>
          </Box>
        </form>
      </Paper>
    </div>
  );
}

export default Form;
