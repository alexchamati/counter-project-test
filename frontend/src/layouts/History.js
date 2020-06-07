import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircleElement from "../components/CircleElement";
import { getHistoryCounter, deleteHistoryCounter } from "../services/Api";

const useStyles = makeStyles((theme) => ({
  mainGridContainer: {
    padding: 35,
  },
  containerListHistory: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    minHeight: "400px",
    maxHeight: "400px",
    overflow: "auto",
  },
  listHistory: {},
  elementHistory: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
    height: "48px",
    fontSize: "25px",
    color: "#000000DE",
    font: "Roboto",
  },
  elementLastTotal: {
    paddingRight: 20,
  },
  elementOperation: {
		paddingRight: 20,
		marginTop: 7,
  },
  elementNumber: {
    paddingRight: 20,
  },
  elementTotal: {
    color: theme.palette.primary.main,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  containerResetButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70px",
  },
  circularProgress: {
    fontSize: "14px",
    position: "absolute",
  },
}));

export default function HistoryLayout(props) {
  const [loaded, setLoaded] = useState(false);
  const [historyCounter, setHistoryCounter] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles(props);

  useEffect(() => {
    async function handleGetHistoryCounter() {
      const historyCounterTmp = await getHistoryCounter();
      if (historyCounterTmp) {
        setHistoryCounter(historyCounterTmp);
      }
      setLoaded(true);
    }
    if (!loaded) {
      handleGetHistoryCounter();
    }
  }, [loaded]);

  function handleReset() {
    setIsLoading(true);
    async function handleDeleteHistoryCounter() {
      const response = await deleteHistoryCounter();
      setIsLoading(false);
      setLoaded(false);
      return response;
    }
    handleDeleteHistoryCounter();
  }

  return (
    <article className="historyontainer">
      <Grid container className={classes.mainGridContainer}>
        <Grid
          container
          item
          xs={12}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Paper
            variant="outlined"
            elevation={3}
            className={classes.containerListHistory}
          >
            <Typography>
              {loaded && (
                <ul classes={classes.listHistory}>
                  {historyCounter.map((counter) => (
                    <li className={classes.elementHistory} key={counter.id}>
                      <span className={classes.elementLastTotal}>
                        {counter.last_total}
                      </span>
                      <span className={classes.elementOperation}>
                        {<CircleElement operation={counter.operation} />}
                      </span>
                      <span className={classes.elementNumber}>
                        {counter.number}
                      </span>
                      {"="}
                      <span className={classes.elementTotal}>
                        {counter.total}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Typography>
          </Paper>
          <div className={classes.containerResetButton}>
            <Button
              type="submit"
              disabled={isLoading}
              onClick={handleReset}
              variant="contained"
              color="primary"
            >
              <span style={{ visibility: isLoading && "hidden" }}>
                Effacer l'historique
              </span>
              {isLoading && (
                <CircularProgress
                  size={20}
                  className={classes.circularProgress}
                />
              )}
            </Button>
          </div>
        </Grid>
      </Grid>
    </article>
  );
}
