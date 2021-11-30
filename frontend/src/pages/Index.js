import React from "react";
import { Link } from "react-router-dom";
import BigCardButton from "../components/BigCardButton";
import Stack from "@mui/material/Stack";

function Index() {
  const generateReportClick = () => {
    <Link to="/generateReport"> </Link>;
  };
  return (
    <div>
      <h3>Course Scheduling System</h3>
      <hr />
      <p>What would you like to do?</p>
      <Stack direction="row" spacing={4}>
        <BigCardButton
          text="Update Course Catalog"
          routeName="/updateCatalog"
        />
        <BigCardButton text="Generate Report" routeName="/generateReport" />
        <BigCardButton text="View Report" routeName="/viewReport" />
      </Stack>

      <Link to="/contact"> Go to Conatct Page</Link>
    </div>
  );
}

export default Index;
