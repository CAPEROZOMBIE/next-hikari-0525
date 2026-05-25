// app\news\archive\[month_id]\page.tsx 月別一覧

import style from "./month_id.module.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { getAkiyamaNews } from "./../../../library/microcms"

// 月別アーカイブリスト及び前後の月
import { getAllAkiyamaNews } from "./../../../library/microcms"
import Link from "next/link";

// import Link from "next/link";

export const revalidate = 60;

type alltype = { params: Promise<{ month_id: string }> }
async function Page({ params }: alltype) {
   const {month_id} = await params;
   const Yamata_news = await getAkiyamaNews({
      filters:`publishedAt[begins_with]${month_id}`,
      fields: ["id", "title", "category"],
      limit: 31
   })

   //　月別アーカイブリストと前後の月
   const all = await getAllAkiyamaNews({
      fields:["publishedAt"]
   })

   // 前後の月
   const monthSet = new Set<string>()
   all.forEach((item)=>{
      if(!item.publishedAt)return
      const d = new Date(item.publishedAt)
      const ym = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`
      monthSet.add(ym)
   })

   const monthList = Array.from(monthSet).sort((a,b)=>b.localeCompare(a))
   const currentIndex = monthList.indexOf(month_id)
   const prevMonth = monthList[currentIndex + 1]
   const nextMonth = monthList[currentIndex - 1]


   //月別アーカイブリスト
   const archives:Record<string,number> = {}
   all.forEach((n)=>{
      if(!n.publishedAt) return
      const d = new Date(n.publishedAt) 
      const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`
      
      archives[key] = (archives[key]||0)+1
   })

   const archiveList = Object.entries(archives).sort((a,b)=>b[0].localeCompare(a[0]))

   return (
      <div className={style.wrap}>
         <Header />
         <main className={style.main}>
            <div className={style.maindiv}>
               <h2 className={style.h2}>{month_id}一覧</h2>
               <ul className={style.ul}>

                  {Yamata_news.contents.map((create) => (
                     <li key={create.id} className={style.li}>
                        <Link href={`/news/detail/${create.id}`} > {create.title} </Link>
                        ｜　<Link href={`/news/category/${create.category?.id}/1`}>{create.category?.name}</Link>
                     </li>
                  ))
                  }
               </ul>
            </div>
   
            {/* さて */}

            <br />
            <hr />
            <br />
            <nav>
               {prevMonth?(
                  <Link href={`/news/archive/${prevMonth}`}>前の月へ</Link>
               ):(
                  <span>前の月へ</span>
               )}

               {"　｜　"}

               {nextMonth?(
                  <Link href={`/news/archive/${nextMonth}`}>次の月へ</Link>
               ):(
                  <span>次の月へ</span>
               )}
            </nav>

            {/* 月別アーカイブリスト */}

            <br />
            <hr />
            <br />
            
            <div>
               <ul>
                  {archiveList.map(([month,count])=>{
                     const[y,m] = month.split("-")

                     return(
                     <li key={month}>
                        <Link href={`/news/archive/${month}`}>
                        {y}年{m}月({count})
                        </Link>
                     </li>
                     )
                  })}
               </ul>
            </div>


         </main>

         <br />
         <hr />
         <br />
         <Footer />
      </div>
   );
}

export default Page