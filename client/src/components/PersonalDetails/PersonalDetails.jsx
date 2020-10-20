import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import NavBar from "../common/Navbar/Navbar";
import Swal from "sweetalert2";

import "../../App.css";
import "./PersonalDetails.css";
import { getCurrentUser, update } from "../../APIFetchers";

const PersonalDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();

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
    if (!res.success) {
      Swal.fire(
        "Error",
        "Something went wrong, please try again",
        "error"
      );
    } else {
      history.push('/Account');
    }
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
