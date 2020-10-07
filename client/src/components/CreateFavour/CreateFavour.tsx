import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";

import "../../App.css";
import "./CreateFavour.css";

const CreateFavour = () => {
  return (
    <div className="CreateFavour">
      <NavBar />

      <div id="form-title">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Create a Favour</h1>
      </div>

      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <form>
            <label>
              Title
              <br></br>
              <input placeholder="Create a name for this favour" type="text" />
            </label>

            <br></br>

            <br></br>
            <label>
              Description
              <br></br>
              <input placeholder="Describe the favour" type="text" />
            </label>

            <br></br>

            <br></br>
            <label>Assignee</label>
            <br></br>
            <select>
              <option value="" disabled selected hidden>
                Assign a friend to this favour
              </option>
              <option value="person1">person1</option>
              <option value="person2">person2</option>
            </select>

            <br></br>

            <br></br>
            <label>Category</label>
            <br></br>
            <select>
              <option value="" disabled selected hidden>
                Choose a category
              </option>
              <option value="option1">option1</option>
              <option value="option2">option2</option>
            </select>

            <br></br>

            <br></br>
            <label>XP Points Earned</label>
            <br></br>
            <input
              placeholder="Points to earn"
              type="number"
              id=""
              min="1"
              max=""
            ></input>

            <br></br>

            <br></br>
            <label>Due date</label>
            <br></br>
            <input type="date" id=""></input>

            <br></br>

            <div className="form-submit">
              <br></br>
              <input type="submit" value="Submit!" />
            </div>
          </form>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default CreateFavour;
