import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../common/Navbar/Navbar";
import Filter from "bad-words";
import "../../App.css";
import "./ReviewFavour.css";

const ReviewFavour = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  var filter = new Filter();
  return (
    <div className="ReviewFavour">
      <NavBar />

      <div id="form-title">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h1>Review a Favour</h1>
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
                  Choose a favour that has been recently completed
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
              <input type="text"
                value={description}
                onChange={(e) => setDescription(filter.clean(e.target.value))} />
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
              <input type="submit" value="Accept!" />
            </div>
          </form>

          <div id="form-content" className="greybox-centre">
            <Link to="/">
              <p className="cancel-button">Cancel</p>
            </Link>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default ReviewFavour;
