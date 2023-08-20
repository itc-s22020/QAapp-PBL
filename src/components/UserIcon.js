import {Box} from "@mui/material";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const UserIcon = ({user_id, width = 50, height = 50}) =>
    <Box component={'img'} sx={{border: '1px #D1D1E9 solid', borderRadius: 48}}
         src={`${process.env.NEXT_PUBLIC_API_HOST}/api/icons/${user_id}`} alt={user_id} width={width} height={height}/>

export default UserIcon