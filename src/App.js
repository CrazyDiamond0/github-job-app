import "./App.css";
import { combineReducers, createStore } from "redux";
import reducer from "./store/reducer";
import filterReducer from "./store/filterReducer";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useEffect, useState } from "react";
import Table from "./Table";
import { Container } from "@mui/material";
import AppBar from "./AppBar";
const axios = require("axios");
const store = createStore(
  combineReducers({ joblist: reducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
const url = "https://api.graphql.jobs/";

const query = {
  query: `query {
  jobs{
    title,
    description,
    company{
      name,
      websiteUrl,
      logoUrl,
    },
    postedAt,
    applyUrl,
    locationNames
  },
}`,
};

const header = {
  headers: {
    "Content-Type": "application/json",
  },
};

const fetchjobs = (callback) => {
  return axios
    .post(url, query, header)
    .then((res) => {
      store.dispatch({ type: "ADD_ALL", value: res.data.data.jobs });
    })
    .catch((e) => console.log(e));
};

function App() {
  useEffect(() => {
    fetchjobs();
  }, []);

  return (
    <Provider store={store}>
      <AppBar header={header} query={query} url={url} axios={axios} />
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Table store={store}></Table>
        </div>
      </Container>
    </Provider>
  );
}

export default App;
