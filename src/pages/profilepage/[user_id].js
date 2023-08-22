import React from 'react';
import ProfilePage from '../../components/ProfilePage';
import {useRouter} from "next/router";

const Profile = () => {
    const router = useRouter()
    const {user_id} = router.query
    return (
        <div>
            <ProfilePage user_id={user_id}/>
        </div>
    );
};

export default Profile;

