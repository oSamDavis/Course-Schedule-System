import React, { useState } from "react";
import BigCardButton from "../components/BigCardButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@material-ui/icons/Add";
import GenerateForm from "../components/GenerateForm";


function GenerateReport() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const handleClose = () => setOpen(false);
  const handleMajorClick = () => {
    setType("MAJOR");
    setOpen(true);
    
  };
  const handleGenEdClick = () => {
    setType("GENED");
    setOpen(true);
    
  };
  const handleMajorandGenEdClick = () => {
    setType("MAJOR + GENED");
    setOpen(true);
    
  };

  return (
    <div>
      <h3>Generate Report</h3>
      <hr />
      <p>Which Degree Audit Would You Like To Generate?</p>

      <GenerateForm open={open} handleClose={handleClose} catalogType={type} />
      <Stack direction="row" spacing={4}>
        <BigCardButton
          text="Major Report"
          startIcon={<AddIcon />}
          onClick={handleMajorClick}
        />
        <BigCardButton
          text="GenEd Report"
          startIcon={<AddIcon />}
          onClick={handleGenEdClick}
        />
        <BigCardButton
          text="Major + GenEd Report"
          startIcon={<AddIcon />}
          onClick={handleMajorandGenEdClick}
        />
      </Stack>
    </div>
  );
}

export default GenerateReport;
