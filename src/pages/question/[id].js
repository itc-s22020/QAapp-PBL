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
import Image from "next/image";
import {formatDate} from "@/lib/formatDate";

const AnswerForm = () => {
    const router = useRouter()
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState('')
    const {id} = router.query
    const postAnswer = () => {
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
    return (
        <Box sx={{textAlign: 'left', mx: 2}}>
            <h2>回答を書き込む</h2>
            {error ? <Alert sx={{mb: 1}} severity={"error"}>{error}</Alert> : <></>}
            <Box>
                <TextField name="answer" id="answer" minRows={5}
                           onChange={(e) => setAnswer(e.target.value)} fullWidth multiline></TextField>
            </Box>
            <Button sx={{mt: 2}} size={"large"} variant={"contained"} onClick={postAnswer}>回答を投稿する</Button>
        </Box>
    )
}

const LoginForm = ({checkLogin}) => {
    const [inputUser, setInputUser] = useState('')
    const [inputPassword, setInputPassword] = useState('')
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
        </>
    )
}

const AnswerOrLogin = ({
                           user,
                           logout,
                           question,
                           checkLogin
                       }) => {
    if (user) {
        return (
            <>
                {user}としてログイン中 <button onClick={logout}>ログアウトする</button>
                {question.user_id !== user ? <AnswerForm /> : <></>}
            </>
        )
    } else {
        return (
            <>
                <LoginForm checkLogin={checkLogin}/>
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
const Post = ({post, current_user}) => {
    const {user_id, user_name, date, like, a_id, q_id} = post
    const isAnswer = a_id !== undefined
    const [id, type, text] = isAnswer ? [a_id, 'answer', post.a_text] : [q_id, 'question', post.q_text]
    return (
        <div className={styles.content}>
            <Box className={styles.user} sx={{display: 'flex'}}>
                <UserIcon user_id={user_id}/>
                <Box sx={{ml: 1}}>
                    {user_name} さん<br/>
                    {formatDate(date)}
                </Box>
                {/*回答データの場合は削除ボタンを表示する*/}
                {isAnswer && user_id === current_user ?
                    <DeleteButton text={text} a_id={id}/>
                    : <></>
                }
            </Box>
            <div className={styles.contentText}>
                {MultilineText(text)}
            </div>
            <div className={styles.contentBottom}>
                {/*質問文の場合はカテゴリも表示する*/}
                {!isAnswer ? <p>{post.c_name}</p> : <p></p>}
                <LikeButtonBox current_user={current_user} initialLikeCount={like} type={type} id={id}/>
            </div>
        </div>
    )
}

const UserIcon = ({user_id}) => <Image src={`http://localhost:8080/api/icons/${user_id}`} alt={user_id} className={styles.icon} width={50} height={50}/>

const LikeButtonBox = ({current_user, initialLikeCount, type, id}) => {
    const [likes, setLikes] = useState(initialLikeCount)
    return (
        <Box sx={{ml: 2, display: 'flex', alignItems: 'center'}}>
            <DisplayLikeButton current_user={current_user} type={type} id={id} likes={likes} setLikes={setLikes} />
            <p>{likes} いいね</p>
        </Box>
    )
}

const DisplayLikeButton = ({current_user, type, id, likes, setLikes}) => {
    const [isLiked, setLiked] = useState(false)
    useEffect(() => {
        // ログインをしていない場合はいいね状態をチェックしない
        if (!current_user) {
            return
        }
        const data = {
            id: id
        }
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${type}/liked`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((r) => r.json())
            .then((d) => setLiked(d['liked']))
    }, [current_user, id, type])
    if (current_user) {
        if (isLiked) {
            return <UnLikeButton setLiked={setLiked} setLikes={setLikes} likes={likes} type={type} id={id}/>
        } else {
            return <LikeButton setLiked={setLiked} setLikes={setLikes} likes={likes} type={type} id={id}/>
        }
    }
    return <DisabledLikeButton />
}

const UnLikeButton = ({setLiked, setLikes, likes, type, id}) => {
    const unlike = () => {
        const data = {id: id}
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${type}/unlike`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((r) => r.json())
            .then(() => {
                setLikes(likes - 1)
                setLiked(false)
            })
    }
    return (
        <IconButton onClick={unlike}>
            <IconLiked fontSize={"large"} color={"error"}/>
        </IconButton>
    )
}

const LikeButton = ({setLiked, setLikes, likes, type, id}) => {
    const like = () => {
        const data = {id: id}
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/${type}/like`, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
            .then((r) => r.json())
            .then(() => {
                setLikes(likes + 1)
                setLiked(true)
            })
    }
    return (
        <IconButton onClick={like}>
            <IconNotLiked fontSize={"large"} color={"error"}/>
        </IconButton>
    )
}

const DisabledLikeButton = () =>
    <Link href={"/login"}>
        <IconButton>
            <IconNotLiked fontSize={"large"} color={"error"}/>
        </IconButton>
    </Link>
const DeleteButton = ({text, a_id}) => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleDelete = () => deleteAnswer(a_id)
    const router = useRouter()
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
        }).then(() => {
            router.reload()
        })
    }
    return (
        <Box sx={{ml: 1}}>
            <Button variant={"contained"}
                    onClick={handleOpen}>削除する</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>本当に削除してよろしいですか？</DialogTitle>
                <DialogContent>
                    {text.split('\n').map((s) => <DialogContentText key={s}>{s}</DialogContentText>)}
                </DialogContent>
                <DialogActions>
                    <Button variant={"outlined"} onClick={handleClose}>キャンセル</Button>
                    <Button variant={"contained"} onClick={handleDelete} color={"error"}>削除する</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const AnswerPost = ({answer, current_user}) => {
    return <Post post={answer} current_user={current_user}/>
}

const QuestionPost = ({question, current_user}) => {
    return <Post post={question} current_user={current_user}/>
}

const AllAnswers = ({question, current_user, showAllAnswers}) => {
    if (question.best_a) {
        return (
            <>
                <h1 className={styles.textLeft}>ベストアンサー</h1>
                <Post post={question.best_a} current_user={current_user}/>
                {question.answers.length >= 2 ?
                    <>
                        <h1 className={styles.textLeft}>その他の回答 ({question.answers.length - 1}件)</h1>
                        {question.answers.filter((a) => a.a_id !== question.best_a.a_id).slice(0, showAllAnswers ? undefined : 3).map((a, i) =>
                            <AnswerPost key={i} answer={a} current_user={current_user}/>
                        )}
                    </> : <></>
                }
            </>
        )
    } else {
        return (
            <>
                <h1 className={styles.textLeft}>回答 ({question.answers.length}件)</h1>
                {question.answers.slice(0, showAllAnswers ? undefined : 3).map((a, i) =>
                    <AnswerPost key={i} answer={a} current_user={current_user}/>
                )}
            </>
        )
    }
}
const MultilineText = (s) =>
    s.split('\n').map((line) => <p key={line} className={styles.multiLine}>{line}</p>)
const Question = () => {
    const router = useRouter()
    const [question, setQuestion] = useState()
    const [user, setUser] = useState()
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
    const logout = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/logout`, {
            credentials: "include"
        }).then(() => setUser(null))
    }
    return (
        <>
            <div className={styles.page}>
                <div className={styles.container}>
                    <h1 className={styles.textLeft}>{question.title}</h1>
                    <QuestionPost question={question} current_user={user}/>
                    <AllAnswers question={question} current_user={user} showAllAnswers={showAllAnswers}/>
                    {/*回答がベストアンサーを除いて３件以上あって、全ての回答が表示されていない場合*/}
                    {!showAllAnswers && question.answers.length - (!!question.best_a) > 3 ?
                        <Box sx={{m: 1}}>
                            <Button sx={{width: '100%'}} variant={"contained"} size={"large"}
                                    onClick={() => setShowAllAnswers(true)}>その他の回答を表示する</Button>
                        </Box>
                        : <></>}
                    {/*<p>{token}</p>*/}
                    {/*<AnswerOrLogin/>*/}
                    {
                        <AnswerOrLogin user={user} logout={logout} question={question} checkLogin={checkLogin}/>
                    }
                </div>
            </div>
        </>
    )
}

export default Question