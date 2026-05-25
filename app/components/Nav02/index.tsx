// app\components\Nav02\index.tsx ナビ02

"use client"

import style from "./nav2.module.css"
import { useState } from "react"
import Link from "next/link"
import { useEffect } from "react"

function Nav02() {

    const [OpenNav, setOpenNav] = useState<boolean>(false)
    const open = () => setOpenNav(true)
    const close = () => setOpenNav(false)

    useEffect(() => {
        if (OpenNav) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
        return () => document.body.classList.remove("no-scroll")
    }, [OpenNav])

    return (
        <>
            <nav className={`${style.nav} ${OpenNav && style.open}`} onClick={close}>
                
            {/* <nav className={`${style.nav} ${OpenNav && style.open}`}> */}
                <ul className={`${style.ul} ${OpenNav && style.open}`}>
                    <li><Link href="/">トップページ</Link></li>
                    <li><Link href="/about">アバウトページ</Link></li>
                    <li><Link href="/news/1">ニュース</Link></li>
                </ul>
                <p className={style.small}>
                    © {new Date().getFullYear()} Tadayoshi.Y All Rights Reserved.
                </p>
                {/* <button className={style.close} onClick={close}>閉じる</button> */}
                <div className={style.close} onClick={close}><img src={"/close.svg"} alt="" /></div>
            </nav>
            {/* <button className={style.btn} onClick={open}>開く</button> */}
            <div className={style.hamburger} onClick={open}><img src={"/3line.svg"} alt="" /></div>
        </>
    )

}


export default Nav02