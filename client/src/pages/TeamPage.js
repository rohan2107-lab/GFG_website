import React from 'react';
import TeamMemberCard from '../components/Team/TeamMemberCard';
import { teamMembers } from '../mockData';
import { Link } from 'react-router-dom';

const TeamPage = () => {
  // Filter members by category
  const advisors = teamMembers.filter(member => member.category === "Advisors");
  const coreTeam = teamMembers.filter(member => member.category === "Core Team");

  return (
    <div className="team-page-container">
      <div className="team-hero">
        <h1>Meet the <span className="highlight">Minds</span> Behind GFG IKGPTU</h1>
        <p>Our dedicated team of students and faculty advisors working to build a thriving community.</p>
      </div>

      <div className="team-section">
        <h2 className="section-title">Faculty Advisors</h2>
        <div className="team-grid advisor-grid">
          {advisors.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      <div className="team-section">
        <h2 className="section-title">Core Team</h2>
        <div className="team-grid core-team-grid">
          {coreTeam.map(member => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
      
      {/* You can add more sections here for other categories */}
    </div>
  );
};

export default TeamPage;