// \app\news\serchout\page.tsx 検索結果

import style from "./searchout.module.css";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import { SearchForm } from "@/app/components/SearchForm";

import { getAkiyamaNews } from "./../../library/microcms"
import Link from "next/link";

import { taniguchi_Date } from "@/app/library/taniguchi";


// export const revalidate = 60;"

type alltype = { searchParams: Promise<{ q?: string }> }
async function Page({ searchParams }: alltype) {
   const { q } = await searchParams
   const Akiyama_news = await getAkiyamaNews({
      fields: ["id", "title","publishedAt"],
      limit: 50,
      q
   })

   return (
      <div className={style.wrap}>

         <Header />
         <main className={style.main}>
            <div className={style.maindiv}>
               <h2 className={style.h2}>検索結果</h2>
               <SearchForm />

               <div>
                  {Akiyama_news.contents.length === 0 ? (
                     <div className={style.gaitou}>該当はありません</div>
                  ) : (

                     <div>
                        {Akiyama_news.contents
                        .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || "")) //追加
                        .map((item) => (
                           <div key={item.id} className={style.flex}>
                                <time className={style.time}>{item.publishedAt && taniguchi_Date(item.publishedAt) }</time>
                                <div className={style.title}><Link href={`/news/detail/${item.id}`}>{item.title}</Link></div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>
         </main>

         <br />
         <hr />
         <br />

         <div className={style.back}><Link href={`/news/1`}>ニュースに戻る</Link></div>

         <br />
         <hr />
         <br />

         <Footer />
      </div>
   )

}

export default Page