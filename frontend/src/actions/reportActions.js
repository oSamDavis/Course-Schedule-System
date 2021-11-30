import axios from "axios";
import {
  REPORT_CREATE,
  REPORT_DELETE,
  REPORT_UPDATE,
  REPORT_DELETE_ALL,
  REPORT_FETCH_ALL,
} from "../constants/reportConstant";

// for data contains json object with information form => payload
// dispatch means we need to disoatch/send some type of action
export const createReport = (form) => async (dispatch) => {
  try {
    // whatever data/object axios gets back, i'd store it in the data var

    // await axios
    //   .post("/upload", data, {
    //     // receive two parameter endpoint url ,form data
    //   })
    //   .then((res) => {
    //     // then print response status
    //     console.log(res.statusText);
    //   });

    const { data } = await axios.post("/report", form);
    dispatch({ type: REPORT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllReport = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/report");
    dispatch({ type: REPORT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteReport = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/report/${id}`);
    dispatch({ type: REPORT_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const viewBackendReport = (id) => async (dispatch) => {
  // try {
  //   console.log("before send to backend");
  //   const {pdf} = await axios.get(`/reportGenerate/${id}`);

  // } catch (error) {
  //   console.log(error);
  // }

  try {
    await axios
      .get(`/reportGenerate/${id}`, {
        responseType: "blob",
      })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        const pdfWindow = window.open();
        pdfWindow.location.href = fileURL;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    return { error };
  }
};
