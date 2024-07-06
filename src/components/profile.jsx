import React from 'react';

const Profile = ({ name, studentNumber, program }) => {
    return (
        <div className="profile-wrapper">
            <div className="profile-row">
                <span className="profile-label">Name:</span>
                <span className="profile-value">{name}</span>
            </div>
            <div className="profile-row">
                <span className="profile-label">Student Number:</span>
                <span className="profile-value">{studentNumber}</span>
            </div>
            <div className="profile-row">
                <span className="profile-label">Program:</span>
                <span className="profile-value">{program}</span>
            </div>
        </div>
    );
}

export default Profile;
