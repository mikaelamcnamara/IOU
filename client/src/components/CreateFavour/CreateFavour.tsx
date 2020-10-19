import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";
import { createFavour } from '../../APIFetchers'; 

import "../../App.css";
import "./CreateFavour.css";

const CreateFavour = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState(localStorage.getItem('user') || 'person1');
  const [category, setCategory] = useState('food');
  const [points, setPoints] = useState(0);
  const [date, setDate] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    const result = await createFavour(title, description, assignee, category, points, date);
    console.log(result);
  };

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
          <form onSubmit={() => submit}>
            <label>
              Title
              <br></br>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Create a name for this favour"
                type="text"
              />
            </label>

            <br></br>

            <br></br>
            <label>
              Description
              <br></br>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the favour"
                type="text"
              />
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
              value={points}
              onChange={(e) => setPoints(parseInt(e.target.value))}
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
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              id=""
            ></input>

            <br></br>

            <div className="form-submit">
              <br></br>
              <input type="submit" onClick={(e) => submit(e)} value="Submit!" />
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
