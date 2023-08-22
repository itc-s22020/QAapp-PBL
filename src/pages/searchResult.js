import {Box, Typography} from "@mui/material";
import {useRouter} from "next/router";
import SearchField from "@/components/search";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {formatDate} from "@/lib/formatDate";
import IconLiked from "@mui/icons-material/Favorite";
import {useEffect, useState} from "react";
import Link from "next/link";

const SearchResultPage = () => {
    const [data, setData] = useState([])
    const router = useRouter()
    const {q='', c=''} = router.query
    const search = () => {
        const queryParamData = {
            query: q,
            c_id: c
        }
        const queryParams = new URLSearchParams(queryParamData).toString()
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question?${queryParams}`)
            .then((r) => r.json())
            .then((d) => setData(d))
    }
    useEffect(search, [q, c])
    if (!router.isReady) {
        return <p>Loading</p>
    }
    const SearchResult = () =>
        data.map((d, i) => (
            <Box key={i} sx={{m: 2, p: 1, border: '1px #D1D1E9 solid'}}>
                <Link href={`/question/${d.q_id}`}>
                    <Typography variant={'body1'}>{d.title}</Typography>
                </Link>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>

                <Box>
                    <Typography variant={'body1'}>{formatDate(d.date)}</Typography>
                    <Typography variant={'body1'}>
                        <Link href={`/searchResult?c=${d.c_id}`}>
                            {d.c_name}
                        </Link>
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <IconLiked color={'error'} />
                    <Typography ml={1} variant={'h6'}>{d.like}</Typography>
                </Box>
                </Box>
            </Box>
        ))

    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 2}}>
            <Box sx={{maxWidth: 800, minWidth: 300, m: "auto", border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE"}}>
                <Box sx={{m: 2}}>
                    <SearchField defaultValue={q} handleSearch={search}/>
                    <SearchResult />
                </Box>
            </Box>
        </Box>
    )
}

export default SearchResultPage