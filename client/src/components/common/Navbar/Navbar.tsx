import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../../../APIFetchers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Heart from "../../../assets/heart.svg";
import "./Navbar.css";



const Navbar = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [loggedIn] = useState(localStorage.getItem("user") ? true : false);


  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  // Updates as user enters keys on the input search field
  const handleSearch = (e) => {
    const data = e.target.value;
    setSearch(data);
  }

  // Functionality which passses the search term or value from the input field to the SearchPage route
  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/SearchPage',
      search
    });
  };



  return (
    <>
      <div>
        <header>
          <div className="navbar-top">
            <div className="nav-left">
              <div className="top-right">
                <img className="nav-logo" alt="heart" src={Heart} />
              </div>
            </div>
            <Link style={{ textDecoration: "none" }} to="/">
              <div className="iou-logo">
                <h2 id="iou-logo-txt">IOU</h2>
              </div>
            </Link>
            <div className="nav-middle">
              <form className="search-form" onSubmit={handleOnSubmit}>
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for favours...."
                  onChange={handleSearch}
                  value={search}
                />
                {/* <Link style={{ textDecoration: 'none' }} to='/SearchPage'> */}
                <button className='search-btn ' type="submit">
                  <FontAwesomeIcon
                    className='search-icon'
                    icon={faSearch}
                    color='#8A2980'

                  />
                </button>
                {/* </Link> */}
              </form>

            </div>
            <div className="nav-right">
              <Link style={{ textDecoration: "none" }} to="/Leaderboard">
                <p className="leaderboard-txt">LeaderBoard</p>
              </Link>
              <Link
                to="/Favours"
                style={{
                  textDecoration: "none",
                  display: loggedIn ? "inline-block" : "none",
                }}
              >
                <p className="leaderboard-txt">Your Favours</p>
              </Link>
              <Link
                to="/FriendsList"
                style={{
                  textDecoration: "none",
                  display: loggedIn ? "inline-block" : "none",
                }}
              >
                <p className="leaderboard-txt">Friends</p>
              </Link>
              <Link
                to="/Account"
                style={{
                  textDecoration: "none",
                  display: loggedIn ? "inline-block" : "none",
                }}
              >
                <p className="leaderboard-txt">Profile</p>
              </Link>
             
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: loggedIn ? "inline-block" : "none",
                }}
              >
                <button className="signout-btn" onClick={() => handleLogout()}>
                  Logout
                </button>
              </Link>
              <Link to="/SignIn">
                <button
                  className="signin-btn"
                  style={{ display: loggedIn ? "none" : "inline-block" }}
                >
                  Login
                </button>
              </Link>
            </div>
            <div>
              <img
                src="https://i.pinimg.com/originals/1c/54/f7/1c54f7b06d7723c21afc5035bf88a5ef.png"
                className="profile-pic"
                style={{
                  textDecoration: "none",
                  display: loggedIn ? "inline-block" : "none",
                }}
              ></img>
            </div>
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
