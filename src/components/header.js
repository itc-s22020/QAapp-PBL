import Image from 'next/image'
import Link from 'next/link'
import logo from '../images/homelogo.png'
import IconButton from '@mui/material/IconButton';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import TelegramIcon from '@mui/icons-material/Telegram';
import styles from "@/styles/header.module.css";
import LoginIcon from '@mui/icons-material/Login';
import { useRouter } from "next/router";
import { useEffect } from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import Box from "@mui/material/Box";

export default function Header({user, setUser}) {
	const router = useRouter()
	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
			credentials: "include"
		}).then((r) => r.json())
			.then((d) => setUser(d.user))
	}, [])

	const ranking = () => {
		router.replace('/ranking')
	}
	const postPage = () => {
		router.replace('/post')
	}
	const ProfilePage = () => {
		router.replace(`/profilepage/${user}`)
	}
	const login = () => {
		router.replace('/login')
	}
	const logout = () => {
		router.push('/logout')
	}

	return (
		<Box sx={{display: 'flex', alignItems: 'center'}}>
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
				user ?
					<IconButton onClick={postPage}>
						<TelegramIcon className={styles.icon} />
					</IconButton> : ""
			}
			{
				user ?
					<IconButton onClick={ProfilePage}>
						<PersonIcon className={styles.icon} />
					</IconButton> : ""
			}
			{
				user ?
					<IconButton onClick={logout}>
						<LogoutIcon className={styles.icon} />
					</IconButton>
					:
					<IconButton onClick={login}>
						<LoginIcon className={styles.icon} />
					</IconButton>
			}
		</Box >
	)
} 