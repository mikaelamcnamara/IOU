import React, { useState, useEffect } from 'react';
import FavourCard from '../common/FavourCard/FavourCard';
import RequestCard from '../common/RequestCard/RequestCard';
import FavoursBackground from '../../assets/FavoursBackground.svg';
import RequestPlus from '../../assets/RequestPlus.svg';
import NavBar from '../common/Navbar/Navbar';
import { getMyFavours, getMyDebts } from '../../APIFetchers';
import './Favours.css';
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons';


const Favours = () => {
  const [myFavours, setMyFavours] = useState([]);
  const [myDebts, setMyDebts] = useState([]);

  const getFavoursAndDebts = async () => {
    let result = await getMyFavours();
    const favs = result.myFavours.filter(favour => !favour.complete).map(favour => <RequestCard key={favour._id} avatar={result.avatar} name={result.fullName} category={favour.category} title={favour.title} description={favour.description} xp={favour.points} id={favour._id} isPending={favour.applicant_user}/>)
    setMyFavours(favs);

    result = await getMyDebts();
    const debts = result.myDebts.filter(debt => !debt.complete).map(debt => <FavourCard key={debt._id} creatorId={debt.creator._id} avatar={debt.creator.avatar} name={debt.creator.fullName} category={debt.category} title={debt.title} description={debt.description} xp={debt.points} id={debt._id} isPending={debt.applicant_user}/>)
    setMyDebts(debts);
  }

  useEffect(() => {
    getFavoursAndDebts();
  }, []);

  return (
    <div className='favours'>
      <NavBar />
      <h1
        className='favours-header'
        style={{ color: 'white', marginTop: '150px' }}
      >
        Favours you owe
      </h1>
      {myDebts.length === 0 ? <h2 className="favours-placeholder-text">You don't owe any favours, congratulations!</h2> : myDebts}

      <a href="/CreateFavour">
        <div className='create-request'>
          <img src={RequestPlus} alt='request plus' />
          <h1 className='create-request-header'>Create a request</h1>
        </div>
      </a>
      <h1 className='favours-header' style={{ color: '#464646' }}>
        Your Active Requests
      </h1>
      {myFavours.length === 0 ? <h2 className="favours-placeholder-text">You don't have any requests, create one!</h2> : myFavours}

      <div className='favours-bg'>
        <img src={FavoursBackground} alt='Favours background' />
      </div>
    </div>
  );
};

export default Favours;
