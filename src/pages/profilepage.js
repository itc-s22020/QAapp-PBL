import React from 'react';
import ProfilePage from '../components/ProfilePage';
import AnswerProfile from '../components/answer_profile';
import Styles from '../styles/profile.module.css';

const Profile = () => {
  return (
    <div className={Styles.container}>
      <ProfilePage />
      <AnswerProfile />	  
    </div>
  );
};

export default Profile;

