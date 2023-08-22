import '@/styles/globals.css'
import Header from "@/components/header";
import {useState} from "react";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState('')
  return <>
    <Header user={user} setUser={setUser}/>
    <Component {...pageProps} user={user} setUser={setUser}/>
    </>
}
