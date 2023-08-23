import Image from 'next/image'
import Link from 'next/link'
import logo from '../images/homelogo.png'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
import styles from "@/styles/header.module.css";
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default function Header() {
	const router = useRouter()
	const [check, setCheck] = useState('')
	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
			credentials: "include"
		}).then((r) => {
			console.log(r.status)
			setCheck(r.status === "200" ? true : false)
			console.log(check)
		})
	}, [])

	const ranking = () => {
		router.replace('/ranking')
	}
	const postPage = () => {
		router.replace('/post')
	}
	const ProfilePage = () => {
		router.replace('/ProfilePage')
	}
	const login = () => {
		router.replace('/login')
	}
	const logout = () => {
		fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/logout`, {
			credentials: "include"
		})
			.then(r => console.log(r))
	}

	return (
		<div>
			<Link href={'/'} className={styles.wrap}>
				< Image
					src={logo}
					alt='logo'
					width={300}
					height={100}


				/>
			</Link>
			<IconButton onClick={ranking} >
				<LeaderboardIcon className={styles.icon} />
			</IconButton>
			{
				check ?
					<IconButton onClick={postPage}>
						<TelegramIcon className={styles.icon} />
					</IconButton> : ""
			}
			{
				check ?
					<IconButton onClick={ProfilePage}>
						<PersonIcon className={styles.icon} />
					</IconButton> : ""
			}
			{
				check ? <LogoutIcon className={styles.icon} onClick={logout} /> :
					<IconButton onClick={login}>
						<LoginIcon className={styles.icon} />
					</IconButton>
			}
		</div >
	)
} 