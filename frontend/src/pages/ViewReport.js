import React, { useState, useEffect } from "react";
import ReportTable from "../components/ReportTable";
import { useDispatch } from "react-redux";
import { fetchAllReport } from "../actions/reportActions";

const ViewReport = () => {
  const dispatch = useDispatch();

  // useEffect hooks calls a function(first param) when page is rendered
  useEffect(() => {
    dispatch(fetchAllReport());
  }, [dispatch]);
  return (
    <div>
      <h3>View Report</h3>
      <hr />
      <p>View Report Here</p>

      <ReportTable />
    </div>
  );
};

export default ViewReport;
