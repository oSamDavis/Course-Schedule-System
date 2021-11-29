import React, { useState } from "react";
import {
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "15px",
  },
}));

const CatalogForm = ({ open, handleClose, catalogType }) => {
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState(null);

  const clearData = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
    clearData();
  };

  const onChangeHandler = (event) => {};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Document Upload Portal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload Updated Course Catalogs JSON files
        </DialogContentText>

        <div className={classes.file}>
          {`Upload ${catalogType} Catalog`}
          <input type="file" onChange={onChangeHandler} />
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Update Catalog
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CatalogForm;
