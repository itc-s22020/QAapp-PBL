import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useState} from "react";

const PostPage = () => {
    const [title, setTitle] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [text, setText] = useState('')
    return (
        <>
            <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 1}}>
                <Box sx={{maxWidth: 800, m: "auto", px: 2, border: "1px #D1D1E9 solid", backgroundColor: "#FFFFFE"}}>
                    <Typography variant={"h4"} align={"center"} m={1}>質問を投稿</Typography>
                    <FormControl sx={{my: 1}} fullWidth>
                        <TextField variant={"outlined"} label={"質問タイトル"} onChange={(e) => setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl sx={{my: 1}} fullWidth>
                        <InputLabel>カテゴリ</InputLabel>
                        <Select label={"カテゴリ"} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                            <MenuItem value={1}>勉強</MenuItem>
                            <MenuItem value={2}>趣味</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{my: 1}} fullWidth>
                        <TextField variant={"outlined"} label={"内容"} multiline minRows={5} onChange={(e) => setText(e.target.value)}/>
                    </FormControl>
                    <Button sx={{my: 1}} variant={"contained"}>質問を投稿する</Button>
                </Box>
            </Box>
        </>
    )
}

export default PostPage