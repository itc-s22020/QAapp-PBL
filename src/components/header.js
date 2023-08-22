// import Image from 'next/image'
import logo from '../../public/images/homelogo.png'
// import rank from '../images/ranklogo.png'
// import profile from '../images/prologo.png'
// import logout from '../images/lgout.png'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Image from "next/image";
import Box from "@mui/material/Box";

export default function Header(){
	return (
    	<Box sx={{display: 'flex', alignItems: 'center'}}>
			<Image src={"/images/homelogo.png"} width={396 / 1.5} height={155 / 1.5} alt={'logo'}/>
			<LeaderboardIcon sx={{ml: 8, transform: 'scale(4.0)', color: '#2B2C34'}}/>
        	<PersonIcon sx={{ml: 12, transform: 'scale(4.0)', color: '#2B2C34'}}/>
        	<LogoutIcon sx={{ml: 12, transform: 'scale(4.0)', color: '#2B2C34'}}/>
    	</Box>
  	)
}
