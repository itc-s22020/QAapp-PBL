// import Image from 'next/image'
import logo from '../../public/images/homelogo.png'
// import rank from '../images/ranklogo.png'
// import profile from '../images/prologo.png'
// import logout from '../images/lgout.png'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import Image from "next/image";
import Box from "@mui/material/Box";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useEffect, useState} from "react";
import Link from "next/link";

export default function Header(){
	const [user, setUser] = useState('')
	useEffect(() => {
		fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
			credentials: "include"
		}).then((r) => r.json())
			.then((d) => setUser(d.user))
	}, [setUser])
	const Logo = () =>
		<Link href={'/'}>
			<Image src={"/images/homelogo.png"} width={396 / 1.5} height={155 / 1.5} alt={'logo'}/>
		</Link>
	const RankingButton = () =>
		<Link href={'/ranking'}>
			<LeaderboardIcon sx={{ml: 8, transform: 'scale(4.0)', color: '#2B2C34'}}/>
		</Link>
	const LoginButton = () =>
		<Link href={'/login'}>
			<LoginIcon sx={{ml: 12, transform: 'scale(4.0)', color: '#2B2C34'}}/>
		</Link>
	const ProfileButton = () =>
		<Link href={`/profilepage/${user}`}>
			<PersonIcon sx={{ml: 12, transform: 'scale(4.0)', color: '#2B2C34'}}/>
		</Link>
	const LogoutButton = () =>
		<Link href={'/logout'}>
			<LogoutIcon sx={{ml: 12, transform: 'scale(4.0)', color: '#2B2C34'}}/>
		</Link>

	return (
    	<Box sx={{display: 'flex', alignItems: 'center'}}>
			<Logo />
			<RankingButton />
			{user ?
				<>
					<ProfileButton />
					<LogoutButton />
				</>
				:
				<>
					<LoginButton />
				</>
			}
    	</Box>
  	)
}
