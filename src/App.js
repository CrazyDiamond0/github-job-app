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
  combineReducers({ joblist: reducer, filter: filterReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  useEffect(() => {
    axios
      .post(
        "https://api.graphql.jobs/",
        {
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
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.jobs);
        store.dispatch({ type: "ADD_ALL", value: res.data.data.jobs });
      });
  }, []);

  return (
    <Provider store={store}>
      <AppBar />
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Table></Table>
        </div>
      </Container>
    </Provider>
  );
}

export default App;
