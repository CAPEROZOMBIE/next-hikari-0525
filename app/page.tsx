// next-akiyama\app\page.tsx トップページ

import Image from "next/image";
import style from "./top.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { taniguchi_Date } from "./library/taniguchi";

// 新着
import { getAkiyamaNews } from "./library/microcms";

export default async function Home() {

   const Yamata_top_News = await getAkiyamaNews({
   fields: ["title", "id","publishedAt","category"],
   limit: 5
    })

   return (
      <div className={style.wrap}>
         <Header />
         <main className={style.main}>
               <figure className={style.figureWrap}>
                  <Image 
                        src={"/top-main3.webp"}
                        width={1000}
                        height={500}
                        alt=""
                        quality={100}
                        priority
                   />
               </figure>
               
               <div>
                  <h2 className={style.h2}>新着ニュース</h2>
                  <article>
                     {Yamata_top_News.contents.map((item) => (
                        <div key={item.id} className={style.article_div}>
                            <time className={style.article_time}>{item.publishedAt && taniguchi_Date(item.publishedAt)}</time>
                            <div className={style.article_category}><a href={`/news/category/${item.category?.id}/1`}>{item.category?.name}</a></div>
                            <div className={style.article_title}><a href={`/news/detail/${item.id}`}>{item.title}</a></div>
                        </div>
                    ))}
                  </article>
               </div>

         </main>
         <Footer />
      </div>
   );
}
