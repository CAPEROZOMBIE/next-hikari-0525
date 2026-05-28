// app\components\Footer\index.tsx フッター

import style from "./../Footer/footer.module.css"
import Image from "next/image";
import Nav02 from "./../Nav02/index"
import Link from "next/link";


export default function Header() {

    return (
        <>
            <div className={style.footflex}>
                <div className={style.foot}>
                    <Link href="/">
                        <Image
                            src="/logo2.svg"
                            alt="LOGO"
                            width={200}
                            height={50}
                            priority
                        />
                    </Link>
                    {/* <Nav02 /> */}
                    <div>
                        <ul className={style.ul}>
                            <li><a href="/" >トップページ</a></li>
                            <li><a href="/about" >アバウト</a></li>
                            <li><a href="/news/1" >ニュース</a></li>
                        </ul>
                    </div>

                </div>

                <small className={style.small}>
                    © {new Date().getFullYear()} Tadayoshi.Y All Rights Reserved.
                </small>
            </div>
        </>
    );
}
