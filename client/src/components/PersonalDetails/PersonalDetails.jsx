import React, { useState, useEffect } from "react";
import NavBar from "../common/Navbar/Navbar";

import "../../App.css";
import "./PersonalDetails.css";
import { getCurrentUser } from "../../APIFetchers";
import userEvent from "@testing-library/user-event";

const PersonalDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
    async function fetchData() {
      // You can await here
      const currentUser = await getCurrentUser();
      setName(currentUser.fullName);
      setEmail(currentUser.email);
      // let loggedIn = (localStorage.getItem('user'));

      // user.findById
      // setEmail(data.email);
      // setEmail(loggedIn.email);
      // ...
    }
    fetchData();
  }, [name, email]);



  // let currentUser = getCurrentUser();
  // let data = JSON.parse(currentUser);




  return (
    <div className="PersonalDetails">
      <NavBar />
      {console.log(email)}
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
              <input type="text" name="FullName" defaultValue={name} />
            </label>

            <br></br>

            <br></br>
            <label>
              Email
              <br></br>
              <input type="text" name="Email" defaultValue={email} />
            </label>
            <br></br>
            <br></br>

            <div className="form-submit">
              <br></br>
              <input type="submit" defaultValue="Reset Password" />
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
