import React, { useState } from "react";
import BigCardButton from "../components/BigCardButton";
import Stack from "@mui/material/Stack";
import AddIcon from "@material-ui/icons/Add";
import CatalogForm from "../components/CatalogForm";

const UpdateCatalog = () => {
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
    setType("Honors");
    setOpen(true);
  };
  return (
    <div>
      <h3>Update Course Catalog</h3>
      <hr />
      <p>Upload Updated Catalogs as JSON files Here</p>
      <CatalogForm open={open} handleClose={handleClose} catalogType={type} />
      <Stack direction="row" spacing={4}>
        <BigCardButton
          text="Major Catalog"
          startIcon={<AddIcon />}
          onClick={handleMajorClick}
        />
        <BigCardButton
          text="GenEd Catalog"
          startIcon={<AddIcon />}
          onClick={handleGenEdClick}
        />
        <BigCardButton
          text="Honors Catalog"
          startIcon={<AddIcon />}
          onClick={handleMajorandGenEdClick}
        />
      </Stack>
    </div>
  );
};

export default UpdateCatalog;
