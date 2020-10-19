
import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";
import "../../App.css";
import "./EditAccount.css";

const EditAccount = () => {
  return (
    <div className="EditAccount">
      <NavBar />

      <div id="form-title">
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>

      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <form>
            <h1 className="editaccount-title">Personal Details</h1>
            <label>
              Full Name
              <br></br>
              <input placeholder="Create a name for this favour" type="text" />
            </label>

            <br></br>

            <br></br>
            <label>
              Email
              <br></br>
              <input placeholder="Describe the favour" type="text" />
            </label>



            <div className="form-submit">
              <br></br>
              <input type="submit" value="Reset Password!" />
            </div>
          </form>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default EditAccount;