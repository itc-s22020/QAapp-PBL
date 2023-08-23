import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {useRouter} from "next/router";
import SearchField from "@/components/search";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {formatDate} from "@/lib/formatDate";
import IconLiked from "@mui/icons-material/Favorite";
import {useEffect, useState} from "react";
import Link from "next/link";

const SearchResultPage = () => {
    const [data, setData] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])
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
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category`)
            .then((r) => r.json())
            .then((d) => setCategories(d))
    }, [setCategories])

    const CategorySelect = () =>
        <Select label={"カテゴリ"} defaultValue={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <MenuItem value={''}>全て</MenuItem>
            {categories.map((c, i) => <MenuItem key={i} value={c.id}>{c.name}</MenuItem>)}
        </Select>
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
                        <IconLiked color={'error'}/>
                        <Typography ml={1} variant={'h6'}>{d.like}</Typography>
                    </Box>
                </Box>
            </Box>
        ))

    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 2}}>
            <Box sx={{maxWidth: 800, minWidth: 300, m: "auto", border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE"}}>
                <Box sx={{m: 2}}>
                    <SearchField defaultValue={q} handleSearch={search} categoryId={categoryId}/>
                    <Box sx={{m: 2}}>
                        <FormControl fullWidth>
                            <InputLabel>カテゴリ</InputLabel>
                            <CategorySelect/>
                        </FormControl>
                    </Box>
                    <Typography m={2} variant={'h4'}>検索結果：{data.length}件</Typography>
                    <SearchResult />
                </Box>
            </Box>
        </Box>
    )
}

export default SearchResultPage