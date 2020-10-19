import React, { useState } from "react";
import NavBar from "../common/Navbar/Navbar";
import axios from "axios";

import "../../App.css";
import "./CreateFavour.css";

const CreateFavour = () => {

  const state = {
    title: '',
    description: '',
    favours: []
  };

  const componentDidMount = () => {
    this.getFavours();
  };


  const getFavours = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ favours: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  const submit = (event) => {
    event.preventDefault();

    const payload = {
      title: this.state.title,
      description: this.state.description
    };


    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getFavours();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
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
          <form onSubmit={this.submit}>
            <label>
              Title
              <br></br>
              <input
                value={this.state.title}
                onChange={this.handleChange}
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
                //value={this.state.description}
                //onChange={this.handleChange}
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
              //value={this.state.xp}
              //onChange={this.handleChange}
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
              //value={this.state.date}
              //onChange={this.handleChange}
              type="date"
              id=""
            ></input>

            <br></br>

            <div className="form-submit">
              <br></br>
              <button type="submit" value="Submit!" />
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
