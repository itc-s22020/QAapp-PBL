import Image from 'next/image'
import logo from '../images/homelogo.png'
import rank from '../images/ranklogo.png'
import profile from '../images/prologo.png'
import logout from '../images/lgout.png'

export default function Header(){
	return (
		<>
		<Image
		src={logo}
		width={300}
		height={100}
		style={{marginRight: "40px"}}
		alt=''
		/>
		<Image
		src={rank}
		width={150}
		height={100}
		style={{marginRight: "40px"}}
		alt=''
		/>
		<Image
		src={profile}
		width={150}
		height={100}
		style={{marginRight: "40px"}}
		alt=''
		/>
		<Image
		src={logout}
		width={150}
		height={100}
		style={{marginRight: "40px"}}
		alt=''
		/>
		</>

	)
}

