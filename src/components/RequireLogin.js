import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// ログインしていない場合、ログインページにリダイレクトさせるためのコンポーネントです。
// 例えば質問投稿ページでは、質問投稿にはログインが必要なので、ログインしていない場合はリダイレクトされます。
// pages/post.js のように使用してください。
const RequireLogin = ({user, setUser, CallBackComponent, redirect = '/'}) => {
    const router = useRouter()
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/user/check`, {
            credentials: "include"
        }).then((r) => {
            if (r.status === 200) {
                return r.json()
            } else {
                return router.replace(`/login?redirect=${redirect}`)
            }
        })
            .then((d) => setUser(d.user))
    }, [router, setUser])
    if (user)
        return <CallBackComponent/>
    else
        return <p>Loading</p>
}

export default RequireLogin