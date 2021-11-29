import {
  CONTACT_CREATE,
  CONTACT_DELETE,
  CONTACT_UPDATE,
  CONTACT_DELETE_ALL,
  CONTACT_FETCH_ALL,
} from "../constants/contactConstant";

export const contactReducer = (contacts = [], action) => {
  switch (action.type) {
    case CONTACT_FETCH_ALL:
      return action.payload;
    case CONTACT_CREATE:
      return [...contacts, action.payload];
    case CONTACT_DELETE:
      return contacts.filter((c) => c._id !== action.payload);
    default:
      return contacts;
  }
};
