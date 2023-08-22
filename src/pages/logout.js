import Box from "@mui/material/Box";
import {Button, Typography} from "@mui/material";
import Link from "next/link";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {useEffect} from "react";

const LogoutPage = () => {
    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/logout`, {
            credentials: "include"
        })
    }
    useEffect(logout, [])
    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 1}}>
            <Box sx={{textAlign: "center"}}>
                <Typography variant={"h5"} mt={5}>ログアウトしました。</Typography>
                <Link href={"/"}>
                    <Button variant={"contained"} sx={{m: 2, mb: 5}}>
                        <Typography variant={"h5"}>トップページに戻る</Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default LogoutPage