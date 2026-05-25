// components\Header\index.tsx ヘッダー

import style from "./../Header/header.module.css"
import Image from "next/image";
import Nav02 from "./../Nav02/index"
import Link from "next/link";

export default function Header() {

   return (
      <>
         <div className={style.head}>
            <figure className={style.logo}>
                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="ロゴ"
                        width={16}
                        height={9}
                        priority
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Link>
            </figure>
            <Nav02 />
         </div>
 

      </>
   );
}
