import React, { useState, useEffect } from "react";
import NavBar from "../common/Navbar/Navbar";
import { createFavour, getFriendNames } from "../../APIFetchers";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

import "../../App.css";
import "./CreateFavour.css";

const CreateFavour = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  //const [assignee, setAssignee] = useState('');
  const [category, setCategory] = useState("");
  const [points, setPoints] = useState(0);
  const [date, setDate] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [assignee, setAssignee] = useState('');
  const [friends, setFriends] = useState([{fullName: "", _id: ""}]);
  const history = useHistory();


  //const [assignee, setAssignee] = useState([]);
  const showAssignee = async () => {
    const friendNames = await getFriendNames();
    setFriends(friendNames);
    const options = friendNames.map((friend, i) => <option key={i} value={friend.fullName}/>);
    setSuggestions(options);
  }

  useEffect(() => {
    showAssignee();
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    const found = friends.find(i => i.fullName == assignee);
    const assignee_id = found ? found._id : "";

    const result = await createFavour(
      title,
      description,
      assignee_id,
      category == "" ? "Other" : category,
      points,
      date
    );
    if (result.success) {
      await Swal.fire(
        "Favour Created!",
        "You created has been successfully created.",
        "success"
      );
      history.push("/Favours");
      window.location.reload();
    } else
      Swal.fire(
        "Error Creating Favour",
        "Your favour has not been created due to an error.",
        "error"
      );
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
                required
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
                required
              />
            </label>

            <br></br>

            <br></br>
            <label>Assignee</label>
            <br></br>
            <input list="assignee-favours" value={assignee} required onChange={(e) => setAssignee(e.target.value)}/>
            <datalist id="assignee-favours">
              {suggestions}
            </datalist>

            <br></br>

            <br></br>
            <label>Category</label>
            <br></br>
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled selected hidden>
                Choose a category
              </option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Gaming">Gaming</option>
              <option value="Social">Social</option>
              <option value="Other">Other</option>
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
              max="250"
              required
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
              required
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
