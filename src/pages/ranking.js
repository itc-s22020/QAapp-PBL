import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import UserIcon from "@/components/UserIcon";
import Link from "next/link";
import IconNotLiked from "@mui/icons-material/FavoriteBorder";

const RankingPage = () => {
    const [data, setData] = useState()
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/ranking`)
            .then((r) => r.json())
            .then((d) => setData(d))
    }, [setData])
    if (!data) {
        return <p>Loading</p>
    }
    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 1}}>
            <Paper elevation={8} sx={{maxWidth: 800, minWidth: 750, m: "auto", px: 2, border: "1px #D1D1E9 solid", backgroundColor: "#FFFFF9"}}>
                <Typography variant={"h3"} align={"center"} my={5}>ランキング</Typography>
                <Paper sx={{m: 5}}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align={"center"}><Typography variant={"h6"}>順位</Typography></TableCell>
                                    <TableCell align={"center"}></TableCell>
                                    <TableCell align={"center"}><Typography variant={"h6"}>ユーザー</Typography></TableCell>
                                    <TableCell align={"center"}><Typography variant={"h6"}>いいね数</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((d, i) =>
                                    <TableRow key={i} hover>
                                        <TableCell align={"center"}><Typography variant={"h6"}>{i + 1}位</Typography></TableCell>
                                        <TableCell align={"center"} sx={{p: 1}}>
                                            <Link href={`/profilepage/${d.user_id}`}>
                                                <UserIcon user_id={d.user_id}/>
                                            </Link>
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Link href={`/profilepage/${d.user_id}`}>
                                                <Typography variant={"h6"}>
                                                    {d.name}
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell align={"center"}>
                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                <IconNotLiked fontSize={"large"} color={"error"}/>
                                                <Typography variant={"h6"} ml={1}>{d.like}</Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Paper>
        </Box>
    )
}

export default RankingPage