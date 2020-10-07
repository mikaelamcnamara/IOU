import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";

import "../../App.css";
import "./PersonalDetails.css";

const PersonalDetails = () => {
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
              <input type="text" />
            </label>

            <br></br>

            <br></br>
            <label>
              Email
              <br></br>
              <input type="text" />
            </label>

            <br></br>

            <br></br>
            <label>
              Password
              <br></br>
              <input type="password" />
            </label>

            <div className="form-submit">
              <br></br>
              <input type="submit" value="Reset Password" />
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
