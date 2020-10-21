import React, { useState, useRef, useEffect } from "react";
import { useParams } from 'react-router-dom';
import NavBar from "../common/Navbar/Navbar";
import { getAFavour } from '../../APIFetchers';
import Swal from "sweetalert2";
import Filter from "bad-words";

import { upload } from '../../APIFetchers';

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
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const [uploadImage, setUploadImage] = useState();
  const [submission, setSubmission] = useState('');
  const [image, setImage] = useState();
  var filter = new Filter();

  const [favour, setFavour] = useState<Favour>({
    title: '',
    creator: {
      fullName: '',
      _id: '',
      avatar: 0,
    },
    description: '',
  })


  const imagePicker = useRef<HTMLInputElement>(null);

  const getFavourDetails = async () => {
    const fav = await getAFavour(id);
    // console.log(fav);
    setFavour(fav);
  }

  useEffect(() => {
    getFavourDetails();
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);



  const imagePickHandler = (e) => {
    imagePicker?.current?.click();
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setImage(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }

  const uploadForm = async (e) => {
    e.preventDefault();
    let result = await upload();
    console.log(result);
    if (isValid == true) {
      Swal.fire(
        "Favour Fulfilled!",
        "Your form has been successfully sent for review.",
        "success"
      );

    }
    else {
      Swal.fire(
        "Please upload an image",
        "Please upload an image of jpg, png or jpeg format.",
        "error"
      );
    }


  }

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
              Title of Favour: <span style={{ fontWeight: 'normal' }}>{favour.title}</span>
            </label>

            <br></br>

            <br></br>
            <label>
              Submission
              <br></br>
              <input type="text" placeholder="Write about your submission here" value={submission} onChange={(e) => setSubmission(filter.clean(e.target.value))} />
            </label>

            <br></br>

            <br></br>
            <label>
              Attach Image
              <br></br>
              <div className="image-container">
                <div className="image-upload-preview">
                  {previewUrl && <img src={previewUrl} alt="Preview" />}
                </div>
              </div>

              <input type="file" id="file" name="file" ref={imagePicker} accept=".png, .jpeg, .jpg" onChange={imagePickHandler} />
            </label>
            <div>

            </div>

            <br></br>
            <br></br>

            <div className="form-submit">
              <br></br>
              <input onClick={uploadForm} type="submit" value="Send!" />
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
