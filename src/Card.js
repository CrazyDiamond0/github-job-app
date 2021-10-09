import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Grid";

export default function BasicCard(props) {
  return (
    <Accordion style={{ margin: "10px" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Grid container>
          <Grid container xs={2}>
            <Grid item>
              <img
                src={props.job.company.logoUrl}
                alt="Logo"
                style={{ width: "100px", height: "100px" }}
              />
            </Grid>
          </Grid>
          <Grid container xs={10}>
            <Grid item xs={10}>
              <Typography variant="h5" component="div">
                {props.job.title}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h6" component="div">
                {props.job.company.name}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              <Typography variant="h7" component="div">
                {props.job.locationNames}
              </Typography>
            </Grid>
            <Grid item xs={10}>
              {new Date(props.job.postedAt).toLocaleDateString()}
            </Grid>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {props.job.description.split("**").map((label) => (
          <div>
            <Typography>{label}</Typography>
            <br />
          </div>
        ))}
        <Button
          variant="contained"
          onClick={() => {
            window.location.href = props.job.applyUrl;
          }}
        >
          Apply
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}
