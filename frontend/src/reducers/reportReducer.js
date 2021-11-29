import {
  REPORT_CREATE,
  REPORT_DELETE,
  REPORT_UPDATE,
  REPORT_DELETE_ALL,
  REPORT_FETCH_ALL,
} from "../constants/reportConstant";

export const reportReducer = (reports = [], action) => {
  switch (action.type) {
    case REPORT_FETCH_ALL:
      return action.payload;
    case REPORT_CREATE:
      return [...reports, action.payload];
    case REPORT_DELETE:
      return reports.filter((c) => c._id !== action.payload);
    default:
      return reports;
  }
};
