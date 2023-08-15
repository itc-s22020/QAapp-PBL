import Image from 'next/image'
import logo from '../images/homelogo.png'

export default function Header(){
	return (
		<Image
		src={logo}
		width={300}
		height={100}
		alt=''
		/>
	)
}
