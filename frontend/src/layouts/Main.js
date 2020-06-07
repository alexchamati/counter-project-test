import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "../components/Nav";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const Counter = lazy(() => import("./Counter"));
const History = lazy(() => import("./History"));

const useStyles = makeStyles((theme) => ({
  mainLayout: {
		width: "45%",
		minHeight: '693px',
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "5px",
  },
}));

export default function MainLayout(props) {
  const classes = useStyles(props);
  return (
    <Paper elevation={5} className={classes.mainLayout}>
    <Router>
      <Nav />
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route exact path="/" component={Counter} />
            <Route exact path="/history" component={History} />
          </Switch>
        </Suspense>
      </Router>
    </Paper>
  );
}
