import React, { useState, useEffect } from "react";
import { fetchAllContact } from "../actions/contactActions";
import ContactForm from "../components/ContactForm";
import ContactTable from "../components/ContactTable";
import Header from "../components/Header";
import { useDispatch } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // useEffect hooks calls a function(first param) when page is rendered
  useEffect(() => {
    dispatch(fetchAllContact());
  }, [dispatch]);

  return (
    <div>
      <Header />
      <ContactForm open={open} handleClose={handleClose} />
      <ContactTable
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </div>
  );
};

export default Contact;
