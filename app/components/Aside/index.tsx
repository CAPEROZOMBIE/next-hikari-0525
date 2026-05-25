// components\Aside\index.tsx アサイド

import style from "./../Aside/aside.module.css"
import Link from "next/link";


//  試し-５月23日 remix
// カテゴリー関係
import { getAkiyamaCategoryList } from "./../../library/microcms";

// 月別アーカイブリスト用
import { getAllAkiyamaNews } from "./../../library/microcms"
    
// 谷口
// import { taniguchi_Date } from "./../../library/taniguchi";
    

// ------------------------------------


export default async function page() {
    
    
    //  試し-５月23日 remix// カテゴリーリスト
    const category_list = await getAkiyamaCategoryList();
    
    
    // 月別アーカイブリスト・リンク 0325
   const allnews = await getAllAkiyamaNews({
      fields: ["publishedAt"]
   })
   const archives: Record<string, number> = {}

   allnews.forEach((n) => {
      if (!n.publishedAt) return
      const d = new Date(n.publishedAt)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
      archives[key] = (archives[key] || 0) + 1
   })

   const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))

   return (
      <>
           {/* //  試し-５月23日 remix */}
            {/* カテゴリーリスト */}
            <br />
            <hr />
            <br />
            
            <ul className={style.category_radius}>
            {category_list.contents.map((create) => (
                <li key={create.id}>
                    <Link href={`/news/category/${create.id}/1`}>{create.name}</Link>
                </li>
            ))}
            </ul>

            {/* 月別アーカイブリスト */}

            <br />
            <hr />
            <br />

            <div>
               <ul>
                  {archiveList.map(([month, count]) => {
                     const [y, m] = month.split("-")
                     return (
                        <li key={month}>
                           <Link href={`/news/archive/${month}`}>{y}年{m}月({count})</Link>
                        </li>
                     )
                  })}
               </ul>
            </div>
      </>
   );
}
