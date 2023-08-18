import React, {useEffect, useState} from 'react';
import styles from '../styles/profilepage.module.css';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useRouter} from "next/router";
import {formatDate} from "@/lib/formatDate";

const ProfilePage = ({user_id}) => {
    const router = useRouter()
    const [data, setData] = useState()
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/info/${user_id}`)
            .then((r) => r.json())
            .then((d) => setData(d))
    }, [user_id])
    if (!data || !router.isReady) {
        return <p>Loading</p>
    }
    const {name, age, gender} = data
    const date = formatDate(data.date)
    return (
        <div className={styles.profile_container}>
            <div className={styles.profile_content}>
                <div className={styles.hanako01}>
                    <div className={styles.iconContainer}>
                        <div className={styles.catches01}>
                            <div className={styles.icon}></div>
                        </div>
                    </div>
                    <h2>{name}</h2>
                </div>
                <div className={styles.catches}><h2>プロフィール</h2></div>
                <div className={styles.hanako}>
                    <p>性別: {gender}</p>
                    <p>年齢: {age}歳</p>
                    <p>登録日: {date}</p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

