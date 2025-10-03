import React from 'react';

const TeamMemberCard = ({ member }) => {
  return (
    <div className="team-card">
      <div className="card-image-container">
        <img src={member.image} alt={member.name} className="team-member-image" />
      </div>
      <div className="card-content">
        <h3>{member.name}</h3>
        <p className="member-position">{member.position}</p>
      </div>
    </div>
  );
};

export default TeamMemberCard;