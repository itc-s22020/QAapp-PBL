import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

const Question = () => {
    const router = useRouter()
    const [question, setQuestion] = useState()
    const {id} = router.query
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/question/${id}`)
            .then((r) => r.json())
            .then((d) => {
                setQuestion(d)
            })
    }, [id])
    if (!question) {
        return <p>Loading</p>
    }
    return (
        <>
            <div className="title">
                <h1>{question.title}</h1>
            </div>
            <div className="user">
                <h3>by {question.user_id}</h3>
                <p>{question.view} 回閲覧 {question.like} いいね</p>
                <p>{question.date}</p>
            </div>
            <hr/>
            <div className="text">
                <p>{question.q_text}</p>
            </div>
            <hr/>
            <div className="answers">
                <h1>回答</h1>
                {question.answers.map((a) => (
                    <div key={a.a_id} className="answer">
                        <h4>by {a.user_name}</h4>
                        <p>{a.a_text}</p>
                        <p>{a.like} いいね</p>
                    </div>
                    )
                )}
            </div>
            <hr/>
        </>
    )
}

export default Question