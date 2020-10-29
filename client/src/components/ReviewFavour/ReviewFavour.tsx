import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { favourApplicant, acceptSubmission, declineSubmission } from "../../APIFetchers";
import NavBar from "../common/Navbar/Navbar";
import "../../App.css";
import "./ReviewFavour.css";
import Swal from "sweetalert2";

type Favour = {
  _id: string,
  title: string,
  applicant_user: {
    _id: string,
    fullName: string,
  },
  applicant_description: string,
  applicant_image: string,
}

// Hooks initialised for review favour which would be triggered
// when user has submitted a request to review the fulfilled favour
const ReviewFavour = () => {
  const { id } = useParams();
  const [imageString, setImageString] = useState('');
  const [favour, setFavour] = useState<Favour>({
    _id: '',
    title: '',
    applicant_user: {
      _id: '',
      fullName: '',
    },
    applicant_description: '',
    applicant_image: '',
  });
  const history = useHistory();

  const getFavour = async () => {
    let fav = await favourApplicant(id);
    if (fav.favour.applicant_user) {
      setFavour(fav.favour);
      const data = Buffer.from(fav.image.applicant_image.data).toString("base64");
      setImageString(`data:${fav.image.applicant_image.contentType};base64,` + data);
    }
  }

  useEffect(() => {
    getFavour();
  }, []);

  const accept = async (e) => {
    e.preventDefault();
    let res = await acceptSubmission(favour, favour.applicant_user._id);
    if (res.success) {
      history.push('/Favours');
    } else {
      Swal.fire(
        "Error",
        "Something went wrong",
        "error"
      );
    }
  }

  const decline = async (e) => {
    e.preventDefault();
    let res = await declineSubmission(favour._id);
    if (res.success) {
      history.push('/Favours');
    } else {
      Swal.fire(
        "Error",
        "Something went wrong",
        "error"
      );
    }
  }


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
        <h1>Review {favour.applicant_user && favour.applicant_user.fullName}'s Submission</h1>
      </div>

      <br></br>

      <div id="form-content" className="greybox-centre">
        <div className="greybox">
          <form>
            <label>
              Title: {favour.title}
            </label>

            <br></br>
            <br></br>
            <label>
              Submission Text
            </label>
            <br></br>
            <br></br>
            <p>{favour.applicant_description}</p>

            <br></br>

            <br></br>
            <label>
              Image
            </label>
            <br></br>
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <img style={{ margin: 'auto' }} src={imageString} alt="image" />
            </div>
            <br></br>
            <br></br>

            <div className="form-submit">
              <br></br>
              <input className="accept-button" type="submit" onClick={(e) => accept(e)} value="Accept" />
              <br></br>
              <br></br>
              <input type="submit" onClick={(e) => decline(e)} value="Decline" />
            </div>
          </form>

          <div id="form-content" className="greybox-centre">
            <Link to="/Favours">
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
