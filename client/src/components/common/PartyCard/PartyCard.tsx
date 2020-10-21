import React from 'react';
import SubPartyCard from './SubPartyCard';
import './PartyCard.css';

interface IProps {
  users: {name: string, avatar: number}[]
  number: number,
}

const PartyCard = ({users, number}: IProps) => {
  return (
    <>
      <div className='party-favours-card'>
        <div className='party-favours-card-square-bg'>
            <span>{number}</span>
        </div>
        <div className='party-card-text'>
                {users.map(i => <div className="party-attendees" key={i.name}>
                        <SubPartyCard name={i.name} avatar={i.avatar} />
                    </div>
                )}
        </div>
      </div>
    </>
  );
};

export default PartyCard;