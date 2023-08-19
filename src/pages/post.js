import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const PostPage = () => {
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [text, setText] = useState('')

    const [data, setData] = useState([])
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/category`)
            .then((r) => r.json())
            .then((d) => setData(d))
    }, [setData])

    const CategorySelect = () =>
        <Select label={"カテゴリ"} defaultValue={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            {data.map((c) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
        </Select>

    return (
        <>
            <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 1}}>
                <Box sx={{maxWidth: 800, minWidth: 300, m: "auto", px: 2, border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE"}}>
                    <Typography variant={"h4"} align={"center"} m={1} mt={3}>質問を投稿</Typography>
                    <FormControl sx={{my: 1}} fullWidth>
                        <TextField variant={"outlined"} label={"質問タイトル"} onChange={(e) => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl sx={{my: 1}} fullWidth>
                        <InputLabel>カテゴリ</InputLabel>
                        <CategorySelect/>
                    </FormControl>
                    <FormControl sx={{my: 1}} fullWidth>
                        <TextField variant={"outlined"} label={"内容"} multiline minRows={5} onChange={(e) => setText(e.target.value)}/>
                    </FormControl>
                    <FormControl fullWidth>
                        <Button sx={{my: 1, mb: 3, maxWidth: 400, mx: "auto"}} size={"large"} variant={"contained"} >質問を投稿する</Button>
                    </FormControl>
                </Box>
            </Box>
        </>
    )
}

export default PostPage