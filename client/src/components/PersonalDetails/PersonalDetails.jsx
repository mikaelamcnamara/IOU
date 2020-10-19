import React, { useState, useEffect } from "react";
import NavBar from "../common/Navbar/Navbar";

import "../../App.css";
import "./PersonalDetails.css";
import { getCurrentUser, update } from "../../APIFetchers";
import userEvent from "@testing-library/user-event";
import { updateArrayBindingPattern } from "typescript";

const PersonalDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    async function fetchData() {
      // You can await here
      const currentUser = await getCurrentUser();
      setName(currentUser.fullName);
      setEmail(currentUser.email);
    }
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await update(email, name);
    // await alert('fuck yeah');


  }


  return (
    <div className="PersonalDetails">
      <NavBar />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <div id="reset-password-title">
            <h1>Personal Details</h1>
            <br></br>
          </div>
          <form>
            <label>
              Full Name
              <br></br>
              <input type="text" name="FullName" onChange={(e) => setName(e.target.value)} defaultValue={name} />
            </label>
            <br></br>
            <br></br>
            <label>
              Email
              <br></br>
              <input type="text" name="Email" onChange={(e) => setEmail(e.target.value)} defaultValue={email} />
            </label>
            <br></br>
            <br></br>

            <div className="form-submit">
              <br></br>
              <input type="submit" onClick={(e) => handleUpdate(e)} defaultValue="Reset Password" />
            </div>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default PersonalDetails;
