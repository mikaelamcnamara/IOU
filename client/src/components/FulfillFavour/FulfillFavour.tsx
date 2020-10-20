import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../common/Navbar/Navbar";
import { getAFavour } from '../../APIFetchers';

import "../../App.css";
import "./FulfillFavour.css";

type Favour = {
  title: string,
  creator: {
    fullName: string,
    _id: string,
    avatar: number,
  },
  description: string,
}

const FulfillFavour = () => {
  const { id } = useParams();
  const [submission, setSubmission] = useState('');
  const [image, setImage] = useState('');
  const [favour, setFavour] = useState<Favour>({
    title: '',
    creator: {
      fullName: '',
      _id: '',
      avatar: 0,
    },
    description: '',
  })
  console.log(image);
  const getFavourDetails = async () => {
    const fav = await getAFavour(id);
    console.log(fav);
    setFavour(fav);
  }

  useEffect(() => {
    getFavourDetails();
  },[])

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
        <h1>Fulfill {favour.creator.fullName}'s Favour</h1>
      </div>

      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <form>
            <label>
              Title of Favour: <span style={{fontWeight: 'normal'}}>{favour.title}</span>
            </label>

            <br></br>

            <br></br>
            <label>
              Submission
              <br></br>
              <input type="text" placeholder="Write about your submission here" value={submission} onChange={(e) => setSubmission(e.target.value)}/>
            </label>

            <br></br>

            <br></br>
            <label>
              Attach Image
              <br></br>
              <input type="file" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.value)}/>
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
