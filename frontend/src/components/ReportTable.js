import React from "react";
import { Card, IconButton } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport } from "../actions/reportActions";

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

  const delContact = (id) => {
    dispatch(deleteReport(id));
  };

  return (
    <>
      <Card>
        <MaterialTable
          title="Report Details"
          columns={[
            {
              title: "Image",
              field: "selectedImage",
              render: (rowData) => (
                <img
                  alt="UserImage"
                  style={{ height: 36, borderRadius: "50%" }}
                  src={""}
                />
              ),
            },
            { title: "Name", field: "name" },
            { title: "ID", field: "id" },
            {
              title: "Actions",
              field: "actions",
              render: (rowData) =>
                rowData && (
                  <>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        delContact(rowData._id);
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
