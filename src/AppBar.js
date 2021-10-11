import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Collapse from "@mui/material/Collapse";
import { Container, TextField } from "@mui/material";
import { CollectionsBookmark, Input } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar(props) {
  const [filtermenu, setFiltermenu] = useState(false);
  const [generalsearch, setGeneralSearch] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const joblist = useSelector((state) => state.joblist);

  const generalsearchHandle = (e) => {
    setGeneralSearch(e.target.value);
  };

  const locationHandle = (e) => {
    setLocation(e.target.value);
  };

  const descriptionHandle = (e) => {
    setDescription(e.target.value);
  };

  const submitHandle = (e) => {
    props.axios
      .post(props.url, props.query, props.header)
      .then((res) => {
        dispatch({
          type: "ADD_ALL",
          value: filterHandle(res.data.data.jobs, {
            location: location,
            description: description,
            general: generalsearch,
          }),
        });
      })
      .catch((e) => console.log(e));
    e.preventDefault();
  };

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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon
              onClick={() => {
                setFiltermenu(!filtermenu);
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Jobs List
          </Typography>
          <form onSubmit={submitHandle}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                type="text"
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={generalsearchHandle}
              />
            </Search>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </Toolbar>
      </AppBar>
      <Collapse in={filtermenu}>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form onSubmit={submitHandle}>
            <TextField
              type="text"
              id="outlined-basic"
              label="Location"
              variant="outlined"
              style={{ margin: "20px" }}
              onChange={locationHandle}
            />
            <TextField
              type="text"
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ margin: "20px" }}
              onChange={descriptionHandle}
            />
            <input type="submit" style={{ display: "none" }} />
          </form>
        </Container>
      </Collapse>
    </Box>
  );
}
