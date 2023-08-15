import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const AnswerForm = ({setAnswer, postAnswer}) =>
    <div className="answer">
        <label htmlFor="answer">
            <h2>回答を書き込む</h2>
        </label>
        <textarea name="answer" id="answer" cols="100" rows="5"
                  onChange={(e) => setAnswer(e.target.value)}></textarea>
        <button onClick={postAnswer}>回答を投稿する</button>
    </div>

const AnswerOrLogin = ({user, setAnswer, postAnswer, setInputUser, setInputPassword, inputUser, inputPassword, login, logout}) => {
    if (user) {
        return (
            <>
                {user}としてログイン中 <button onClick={logout}>ログアウトする</button>
                <AnswerForm setAnswer={setAnswer} postAnswer={postAnswer}/>
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
                    <input type="password" id="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)}/>
                </div>
                <button onClick={login}>ログインする</button>
                <p>
                    <button>ログインして回答を投稿する</button>
                </p>
            </>
        )
    }
}
const Question = () => {
    const router = useRouter()
    const [question, setQuestion] = useState()
    const [user, setUser] = useState()
    const [answer, setAnswer] = useState('')
    const [inputUser, setInputUser] = useState('')
    const [inputPassword, setInputPassword] = useState('')
    const {id} = router.query
    const checkLogin = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
            credentials: "include"
        }).then((r) => r.json())
            .then((d) => setUser(d.user))
    }
    const formatDate = (s) => {
        const d = new Date(s)
        const [year, month, day, hour, minute] = [
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            d.getHours(),
            d.getMinutes()
        ]
        return `${year}/${month}/${day} ${hour}:${minute}`
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
        }).then(() => {
            // 回答投稿完了ページにリダイレクトさせたい
        })
    }
    return (
        <>
            <div className="title">
                <h1>{question.title}</h1>
            </div>
            <div className="user">
                <h3>by {question.user_name}</h3>
                <p>{question.view} 回閲覧 {question.like} いいね</p>
                <p>{formatDate(question.date)}</p>
            </div>
            <hr/>
            <div className="text">
                <p>{question.q_text}</p>
            </div>
            <hr/>
            <div className="answers">
                <h1>回答</h1>
                {question.answers.map((a, i) => (
                        <div key={i} className="answer">
                            <h4>by {a.user_name}</h4>
                            <p>{a.a_text}</p>
                            <p>{a.like} いいね</p>
                        </div>
                    )
                )}
            </div>
            <hr/>
            {/*<p>{token}</p>*/}
            {/*<AnswerOrLogin/>*/}
            {
                <AnswerOrLogin user={user} setAnswer={setAnswer} postAnswer={() => postAnswer(answer)} setInputUser={setInputUser} setInputPassword={setInputPassword} inputUser={inputUser} inputPassword={inputPassword} login={login} logout={logout}/>
            }
            <hr/>
        </>
    )
}

export default Question