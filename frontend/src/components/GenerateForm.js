import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DialogActions,
  TextField,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FileBase from "react-file-base64";

import { createReport } from "../actions/reportActions";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  file: {
    marginTop: "15px",
  },
}));

// Have form here
// can take in three para
// open
// close
// type of report
// how to know type from here?? state that changes everytime button is clickedd
const GenerateForm = ({ open, handleClose, catalogType }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialState = {
    name: "",
    id: "",
    transcript: null,
    catalog: "",
    genEdCatalog: "",
    majorCatalog: "",
  };
  const [reportData, setReportData] = useState(initialState);

  const [selectedFile, setSelectedFile] = useState(null);

  const clearData = () => {
    setReportData(initialState);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    handleClose();
    let data = new FormData();
    data.append("name", "John");
    data.append("file", reportData.transcript);
    console.log("in handle submit", reportData.transcript);

    console.log(data, "in handle submit");

    axios
      .post("/upload", data, {
        // receive two parameter endpoint url ,form data
      })
      .then((res) => {
        // then print response status
        console.log(res.statusText);
      });

    dispatch(createReport(reportData));
    clearData();
  };

  const onChangeHandler = (event) => {
    setReportData({ ...reportData, transcript: event.target.files[0] });
    setSelectedFile(event.target.files[0]);
    console.log("in on change event", event.target.files[0]);
    console.log("in on change transcript", reportData.transcript);
    console.log("in on change selected file", selectedFile);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Document Upload Portal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload Documents to Generate Report Here
        </DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Enter Student Name"
          type="text"
          fullWidth
          value={reportData.name}
          onChange={(e) =>
            setReportData({ ...reportData, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="id"
          label="Enter Student ID"
          type="number"
          fullWidth
          value={reportData.id}
          onChange={(e) => setReportData({ ...reportData, id: e.target.value })}
        />
        <div className={classes.file}>
          Upload Transcript  
          <input type="file" onChange={onChangeHandler} />
        </div>
        {catalogType === "MAJOR + GENED" ? (
          <div>
            <div className={classes.file}>
              Upload Major Catalog
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setReportData({ ...reportData, majorCatalog: base64 })
                }
              />
            </div>
            <div className={classes.file}>
              Upload GENED Catalog
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setReportData({ ...reportData, genEdCatalog: base64 })
                }
              />
            </div>
          </div>
        ) : (
          <div className={classes.file}>
            {`Upload ${catalogType} Catalog`}
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setReportData({ ...reportData, catalog: base64 })
              }
            />
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Close
        </Button>
        <Button color="primary" onClick={handleSubmit}>
          Generate Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenerateForm;
