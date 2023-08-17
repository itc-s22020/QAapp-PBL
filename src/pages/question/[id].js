import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton,
    TextField
} from "@mui/material";
import styles from "../../styles/Question.module.css"
import Link from "next/link";
import IconLiked from '@mui/icons-material/Favorite';
import IconNotLiked from '@mui/icons-material/FavoriteBorder';

const AnswerForm = ({setAnswer, postAnswer, error}) =>
    <Box sx={{textAlign: 'left', mx: 2}}>
        <h2>回答を書き込む</h2>
        {error ? <Alert sx={{mb: 1}} severity={"error"}>{error}</Alert> : <></>}
        <Box>
            <TextField name="answer" id="answer" minRows={5}
                       onChange={(e) => setAnswer(e.target.value)} fullWidth multiline></TextField>
        </Box>
        <Button sx={{mt: 2}} size={"large"} variant={"contained"} onClick={postAnswer}>回答を投稿する</Button>
    </Box>

const AnswerOrLogin = ({
                           user,
                           setAnswer,
                           postAnswer,
                           setInputUser,
                           setInputPassword,
                           inputUser,
                           inputPassword,
                           login,
                           logout,
                           error
                       }) => {
    if (user) {
        return (
            <>
                {user}としてログイン中 <button onClick={logout}>ログアウトする</button>
                <AnswerForm setAnswer={setAnswer} postAnswer={postAnswer} error={error}/>
            </>
        )
    } else {
        return (
            <>
                <div className="">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={inputUser} onChange={(e) => setInputUser(e.target.value)}/>
                </div>
                <div className="">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={inputPassword}
                           onChange={(e) => setInputPassword(e.target.value)}/>
                </div>
                <Button variant={"contained"} onClick={login}>ログインする</Button>
                <Box sx={{m: 1}}>
                    <Link href={"/login"}>
                        <Button sx={{width: '100%'}} variant={'contained'} size={"large"}
                                color={'success'}>ログインして回答を投稿する</Button>
                    </Link>
                </Box>
            </>
        )
    }
}
const Post = ({user_id, user_name, date, current_user, text, like, deleteAnswer, a_id, q_id, c_name}) => {
    const [isLiked, setLiked] = useState(false)
    const data = {
        id: a_id ? a_id : q_id
    }
    const type = a_id ? 'answer' : 'question'
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${type}/liked`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((d) => {
                console.log(d)
                setLiked(d['liked'])
            })
    }, [])
    return (
        <div className={styles.content}>
            <Box className={styles.user} sx={{display: 'flex'}}>
                <Box sx={{width: 50, height: 50, border: '1px black solid', borderRadius: 10}}>
                </Box>
                <Box sx={{ml: 1}}>
                    {user_name} さん<br/>
                    {formatDate(date)}
                </Box>
                {/*回答データの場合は削除ボタンを表示する*/}
                {a_id && user_id === current_user ?
                    <DeleteButton text={text} deleteAnswer={deleteAnswer} a_id={a_id}/>
                    : <></>
                }
            </Box>
            <div className={styles.contentText}>
                {convertLFtoBR(text)}
            </div>
            <div className={styles.contentBottom}>
                {/*質問文の場合はカテゴリも表示する*/}
                {c_name ? <p>{c_name}</p> : <p></p>}
                <Box sx={{ml: 2, display: 'flex', alignItems: 'center'}}>
                    {isLiked ? <UnLikeButton /> : <LikeButton />}
                    <p>{like} いいね</p>
                </Box>
            </div>
        </div>
    )
}

const UnLikeButton = () =>
    <IconButton>
        <IconLiked fontSize={"large"} color={"error"}/>
    </IconButton>

const LikeButton = () =>
    <IconButton>
        <IconNotLiked fontSize={"large"} color={"error"}/>
    </IconButton>

const DeleteButton = ({text, a_id, deleteAnswer}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleDelete = () => deleteAnswer(a_id)
    return (
        <Box sx={{ml: 1}}>
            <Button variant={"contained"}
                    onClick={handleOpen}>削除する</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>本当に削除してよろしいですか？</DialogTitle>
                <DialogContent>
                    <DialogContentText>{convertLFtoBR(text)}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleClose}>キャンセル</Button>
                    <Button variant={"contained"} onClick={handleDelete} color={"error"}>削除する</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const formatDate = (s) => {
    const d = new Date(s)
    const [year, month, day, hour, minute] = [
        d.getFullYear().toString().padStart(4, 0),
        (d.getMonth() + 1).toString().padStart(2, 0),
        d.getDate().toString().padStart(2, 0),
        d.getHours().toString().padStart(2, 0),
        d.getMinutes().toString().padStart(2, 0)
    ]
    return `${year}/${month}/${day} ${hour}:${minute}`
}
const convertLFtoBR = (s) => s.split('\n').map((s) => <>{s}<br/></>)
const Question = () => {
    const router = useRouter()
    const [question, setQuestion] = useState()
    const [user, setUser] = useState()
    const [answer, setAnswer] = useState('')
    const [inputUser, setInputUser] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const [error, setError] = useState('')
    const [showAllAnswers, setShowAllAnswers] = useState(false)
    const {id} = router.query
    const checkLogin = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
            credentials: "include"
        }).then((r) => r.json())
            .then((d) => setUser(d.user))
    }
    useEffect(() => {
        if (!id) return
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question/${id}`)
            .then((r) => r.json())
            .then((d) => setQuestion(d))
        checkLogin()
    }, [id])
    if (!question) {
        return <p>Loading</p>
    }
    const login = () => {
        const data = {
            user_id: inputUser,
            password: inputPassword
        }
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/login`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        }).then((r) => r.json())
            .then(() => checkLogin())
    }
    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/logout`, {
            credentials: "include"
        }).then(() => setUser(null))
    }
    const postAnswer = (answer) => {
        if (answer.length <= 0) {
            return
        }
        const data = {
            q_id: id,
            a_text: answer
        }
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/answer/new`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            if (r.status === 200) {
                return r.json()
            } else {
                return r.json().then((d) => setError(d.message))
            }
        }).then((d) => {
            if (!d) return
            router.push({
                pathname: '/answer',
                query: {q_id: id}
            })
        })
    }
    const deleteAnswer = async (a_id) => {
        const data = {
            id: a_id
        }
        await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/answer/delete`, {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((r) => {
            router.reload()
        })
    }
    return (
        <>
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1 className={styles.textLeft}>{question.title}</h1>
                    <Post text={question.q_text} like={question.like} date={question.date} user_id={question.user_id}
                          user_name={question.user_name} c_name={question.c_name} q_id={question.q_id}/>
                    <h1 className={styles.textLeft}>回答</h1>
                    {question.answers.slice(0, showAllAnswers ? undefined : 3).map((a, i) =>
                        <Post key={i} date={a.date} user_name={a.user_name} user_id={a.user_id} current_user={user}
                              like={a.like} text={a.a_text} a_id={a.a_id} deleteAnswer={deleteAnswer}/>
                    )}
                    {!showAllAnswers && question.answers.length > 3 ?
                        <Box sx={{m: 1}}>
                            <Button sx={{width: '100%'}} variant={"contained"} size={"large"}
                                    onClick={() => setShowAllAnswers(true)}>その他の回答を表示する</Button>
                        </Box>
                        : <></>}
                    {/*<p>{token}</p>*/}
                    {/*<AnswerOrLogin/>*/}
                    {
                        <AnswerOrLogin user={user} setAnswer={setAnswer} postAnswer={() => postAnswer(answer)}
                                       setInputUser={setInputUser} setInputPassword={setInputPassword}
                                       inputUser={inputUser}
                                       inputPassword={inputPassword} login={login} logout={logout}
                                       error={error}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Question