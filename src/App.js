import "./App.css";
import { combineReducers, createStore } from "redux";
import reducer from "./store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
const axios = require("axios");
const store = createStore(
  combineReducers({ joblist: reducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  const [test, setTest] = useState([]);
  useEffect(() => {
    axios
      .post(
        "https://api.graphql.jobs/",
        {
          query: `{
  jobs{
    title,
    company{
      name
    },
    postedAt,
    createdAt,
    updatedAt
  }
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
        setTest(res.data.data.jobs);
        store.dispatch({ type: "ADD_ALL", value: res.data.data.jobs });
      });
  }, []);

  return (
    <div className>
      {test.map((x) => (
        <div>{x.title}</div>
      ))}
    </div>
  );
}

export default App;
