import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";

import "../../App.css";
import "./FulfillFavour.css";

const FulfillFavour = () => {
  return (
    <div className="FulfillFavour">
      <NavBar />

      <div id="form-title">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Fulfill a Favour</h1>
      </div>

      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <form>
            <label>
              Title
              <br></br>
              <select>
                <option value="" disabled selected hidden>
                  Choose one of your accepted favours
                </option>
                <option value="option1">option1</option>
                <option value="option2">option2</option>
              </select>
            </label>

            <br></br>

            <br></br>
            <label>
              Description
              <br></br>
              <input type="text" />
            </label>

            <br></br>

            <br></br>
            <label>
              Attach Image
              <br></br>
              <input type="file" />
            </label>

            <br></br>
            <br></br>

            <div className="form-submit">
              <br></br>
              <input type="submit" value="Send!" />
            </div>
          </form>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default FulfillFavour;
