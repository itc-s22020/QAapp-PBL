import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import AnswerProfile from '../../components/answer_profile';
import {useRouter} from "next/router";
import styles from '../../styles/profile.module.css';

const Profile = () => {
    const router = useRouter()
    const {user_id} = router.query
    return (
        <div className={styles.container}>
            <ProfilePage user_id={user_id}/>
	    <AnswerProfile />
        </div>
    );
};

export default Profile;

