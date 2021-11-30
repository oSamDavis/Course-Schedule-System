import React from "react";
import { Card, IconButton } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import PreviewIcon from '@mui/icons-material/Preview';
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport, viewBackendReport} from "../actions/reportActions";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  card: {
    margin: "10px",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "1.96rem",
  },
}));

const ContactTable = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const reports = useSelector((state) => state.reports);
  console.log(reports);

  const delReport = (id) => {
    dispatch(deleteReport(id));
  };

  const viewReport = (id)=>{
    console.log("in here, before dispatch")
    dispatch(viewBackendReport(id))
  }

  return (
    <>
      <Card>
        <MaterialTable
          title="Report Details"
          columns={[
            { title: "Name", field: "name" },
            { title: "ID", field: "id" },
            {
              title: "Actions",
              field: "actions",
              render: (rowData) =>
                rowData && (
                  <>
                    <IconButton color="primary">
                      <PreviewIcon onClick = {()=>{
                        viewReport(rowData.id)
                      }} />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        delReport(rowData._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                ),
            },
          ]}
          data={reports}
          actions={[
            {
              tooltip: "Remove all reports",
              icon: "delete",
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            exportButton: true,
            selection: true,
          }}
        />
      </Card>
    </>
  );
};

export default ContactTable;
