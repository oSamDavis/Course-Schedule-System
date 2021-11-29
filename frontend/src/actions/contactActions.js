import axios from "axios";
import {
  CONTACT_CREATE,
  CONTACT_DELETE,
  CONTACT_UPDATE,
  CONTACT_DELETE_ALL,
  CONTACT_FETCH_ALL,
} from "../constants/contactConstant";

// for data contains json object with information form => payload
// dispatch means we need to disoatch/send some type of action
export const createContact = (form) => async (dispatch) => {
  try {
    // whatever data/object axios gets back, i'd store it in the data var
    const { data } = await axios.post("/contact", form);
    dispatch({ type: CONTACT_CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllContact = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/contact");
    dispatch({ type: CONTACT_FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteContact = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/contact/${id}`);
    dispatch({ type: CONTACT_DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
