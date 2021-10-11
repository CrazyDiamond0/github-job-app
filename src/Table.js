import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Pagination } from "@mui/material";
import { useSelector, createStore } from "react-redux";

const filterHandle = (state, filter) => {
  return state.filter((job) => {
    if (job.locationNames === filter.location || filter.location === "") {
      if (
        job.description.includes(filter.description) ||
        filter.description === ""
      ) {
        if (
          job.title.includes(filter.general) ||
          job.description.includes(filter.general) ||
          filter.general === ""
        ) {
          return job;
        }
      }
    }
  });
};

const Table = (props) => {
  const state = useSelector((state) => state.joblist);

  const [pages, setPages] = useState(0);
  const [offsetstartpage, setOffsetstartpage] = useState(0);
  const [offsetendpage, setOffsetendpage] = useState(10);

  useEffect(() => {
    setPages(Math.round(state.length / 10));
  }, [state]);

  const paginationHandle = (e, page) => {
    if (page != null) {
      setOffsetstartpage((page - 1) * 10);
      setOffsetendpage(page * 10);
    }
  };

  return (
    <div>
      {state.slice(offsetstartpage, offsetendpage).map((job) => (
        <Card job={job}></Card>
      ))}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "50px" }}
      >
        <Pagination onChange={paginationHandle} count={pages} color="primary" />
      </div>
    </div>
  );
};

export default Table;
