import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

const Table = () => {
  const state = useSelector((state) => {
    return state.joblist.filter((job) => {
      if (
        job.location === state.filter.location ||
        state.filter.location === ""
      ) {
        return job;
      }
    });
  });

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
