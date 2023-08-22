// import Image from 'next/image'
import logo from '../images/homelogo.png'
// import rank from '../images/ranklogo.png'
// import profile from '../images/prologo.png'
// import logout from '../images/lgout.png'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios"
import "../styles/header.css";

export default function Header(){
	const handleLogout = async(e) => {
     		e.preventDefault()
		try {
			const loginCheck = await axios.get(`${API_HOST}/api/user/login`,{withCredentials:true})
			if (loginCheck.status !== 200){
				return
			}
			await axios.get(`{API_HOST}/api/user/logout`,{
				withCredentials:true
			})
		}catch(e){
			console.log(e)
		}
	}
	return (
    	<div className='wrap'>
		<LeaderboardIcon className='icon' />
        	<PersonIcon className='icon' />
        	<LogoutIcon className='icon' />
    	</div>
  	)
}
