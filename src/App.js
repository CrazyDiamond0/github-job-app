import "./App.css";
const axios = require("axios");

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
  .then((res) => console.log(res.data));

function App() {
  return <div className>Hello</div>;
}

export default App;
