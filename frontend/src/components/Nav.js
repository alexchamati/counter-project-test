import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation, Link } from "react-router-dom";

const useStyles = makeStyles({
  bar: {
    borderRadius: "3px",
  },
  toolBar: {
    justifyContent: "flex-end",
    color: "white",
    borderRadius: "5px",
  },
  toolBarLink: {
    color: "white",
    textDecoration: "none",
    textTransform: "uppercase",
  },
});

export default function NavLayout(props) {
  const classes = useStyles(props);
  const location = useLocation();
  return (
    <>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.toolBar}>
          {location.pathname === "/history" ? (
            <Button>
              <Link to="/" className={classes.toolBarLink}>
                Acceder au compteur
              </Link>
            </Button>
          ) : (
            <Button>
              <Link to="/history" className={classes.toolBarLink}>
                Acceder a l'historique
              </Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
