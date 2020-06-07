import {
  Button,
  CircularProgress,
  FormControl,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import CircleElement from "../components/CircleElement";
import { getLastTotalCounter, postOperationCounter } from "../services/Api";

const useStyles = makeStyles((theme) => ({
  mainGridContainer: {
    padding: 35,
  },
  counterNumber: {
    textAlign: "center",
    font: "Bold 150px/181px Roboto",
    color: theme.palette.primary.main,
    letterSpacing: "0px",
    opacity: 1,
    maxWidth: "760px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  formControl: {
  },
  formSelect: {
    height: "48px",
    marginTop: "50px",
  },
  formInput: {
    marginTop: "160px",
    height: "48px",
    padding: " 0 10px 0 10px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    borderRadius: "4px",
    fontSize: "medium",
  },
  selectItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "48px",
  },
  formContainerButtonSubmit: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70px",
  },
  circularProgress: {
    position: "absolute",
    fontSize: "24px",
  },
}));

const operations = [
  {
    operation: "+",
    label: "Addition",
  },
  {
    operation: "-",
    label: "Soustraction",
  },
  {
    operation: "/",
    label: "Division",
  },
  {
    operation: "x",
    label: "Multiplication",
  },
];

export default function CounterLayout(props) {
  const [loaded, setLoaded] = useState(false);
  const [counterNumber, setCounterNumber] = useState(0);
  const [operationSelect, setOperationSelect] = useState("");
  const [
    operationSelectErrorMessage,
    setOperationSelectErrorMessage,
  ] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValueErrorMessage, setInputValueErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles(props);

  useEffect(() => {
    async function handleGetLastTotalCounter() {
      const counterTmp = await getLastTotalCounter();
      if (counterTmp) {
        setCounterNumber(parseFloat(counterTmp.total));
      }
      setLoaded(true);
    }
    if (!loaded) {
      handleGetLastTotalCounter();
    }
  }, [loaded]);

  function handleSelectOperation(e) {
    setOperationSelect(e.target.value);
    setOperationSelectErrorMessage(false);
  }
  function handleInputValue(e) {
    setInputValue(e.target.value);
    setInputValueErrorMessage(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue === "" || operationSelect === "") {
      if (inputValue === "") {
        setInputValueErrorMessage(true);
      }
      if (operationSelect === "") {
        setOperationSelectErrorMessage(true);
      }
      return false;
    }
    setIsLoading(true);
    async function handlePostOperationCounter(conterOperationTmp) {
      const counterTmp = await postOperationCounter(conterOperationTmp);
      if (counterTmp) {
        setCounterNumber(parseFloat(counterTmp.total));
      }
      setIsLoading(false);
    }

    const conterOperationTmp = {
      value: Math.round((parseFloat(inputValue) + Number.EPSILON) * 100) / 100,
      operation: operationSelect,
    };

    handlePostOperationCounter(conterOperationTmp);
  }

  return (
    <article className={classes.counterContainer}>
      <Grid container className={classes.mainGridContainer}>
        {loaded ? (
          <>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <div title={counterNumber} className={classes.counterNumber}>
                {counterNumber}
              </div>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <form
                onSubmit={handleSubmit}
                className={classes.formControl}
                noValidate
              >
                <FormGroup>
                  <FormControl required error={operationSelectErrorMessage}>
                    <InputLabel id="operation-label">Opération</InputLabel>
                    <Select
                      required
                      labelId="operation-label"
                      className={classes.formSelect}
                      value={operationSelect}
                      onChange={handleSelectOperation}
                    >
                      {operations.map((value) => (
                        <MenuItem key={value.operation} value={value.operation}>
                          <div className={classes.selectItem}>
                            {value.label}{" "}
                            <CircleElement operation={value.operation} />
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    {operationSelectErrorMessage && (
                      <FormHelperText>
                        Champ requis - Veuillez choisir un élément.
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl error={inputValueErrorMessage}>
                    <Input
                      type="number"
                      step="1"
                      placeholder="Valeur"
                      value={inputValue}
                      onChange={handleInputValue}
                      className={classes.formInput}
                    />
                    {inputValueErrorMessage && (
                      <FormHelperText>
                        Champ requis - Veuillez saisir un nombre.
                      </FormHelperText>
                    )}
                  </FormControl>
                </FormGroup>
                <div className={classes.formContainerButtonSubmit}>
                  <Button
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    <span style={{ visibility: isLoading && "hidden" }}>
                      Valider
                    </span>
                    {isLoading && (
                      <CircularProgress
                        size={20}
                        className={classes.circularProgress}
                      />
                    )}
                  </Button>
                </div>
              </form>
            </Grid>
          </>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </article>
  );
}
