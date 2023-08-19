import {Box, Button, Typography} from "@mui/material";
import Link from "next/link";

const QuestionDeletedPage = () => {
    return (
        <Box sx={{backgroundColor: "#F6EEEE", color: "#2B2C34", p: 1}}>
            <Box sx={{textAlign: "center"}}>
                <Typography variant={"h5"} mt={5}>質問を削除しました。</Typography>
                <Link href={"/"}>
                    <Button variant={"contained"} sx={{m: 2, mb: 5}}>
                        <Typography variant={"h5"}>トップページに戻る</Typography>
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}

export default QuestionDeletedPage