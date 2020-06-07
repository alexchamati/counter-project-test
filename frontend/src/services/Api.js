import { HTTPClient } from "./Axios";

export function getLastTotalCounter() {
  return HTTPClient.get("/api/history/last")
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export function postOperationCounter(conterOperationTmp) {
  return HTTPClient.post("/api/counter", conterOperationTmp)
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export function getHistoryCounter() {
  return HTTPClient.get("/api/history")
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return false;
    });
}

export function deleteHistoryCounter() {
  return HTTPClient.delete("/api/history/delete-all")
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return false;
    });
}
