// app\news\category\[cat_id]\[page]\page.tsx カテゴリー一覧

import style from "./cat_id.module.css";
import Header from "./../../../../components/Header";
import Footer from "./../../../../components/Footer";

import { getAkiyamaNews } from "./../../../../library/microcms"
import Link from "next/link";

// カテゴリー関係
import { getAkiyamaCategoryList } from "./../../../../library/microcms";
import { getAkiyamaCategory } from "./../../../../library/microcms";

export const revalidate = 60;

type alltype = { params: Promise<{ cat_id: string; page: string }> }

async function Page({ params }: alltype) {
   const { cat_id, page: pageParams } = await params;
   const page = Number(pageParams)

   const pageSize = 10
   const Yamata_news = await getAkiyamaNews({
      filters: `category[equals]${cat_id}`,
      fields: ["id", "title", "category"],
      limit: pageSize,
      offset: (page - 1) * pageSize
   })

   const lastPage = Math.ceil(Yamata_news.totalCount / pageSize)
   const maxPages = 5

   let start = 1
   let end = Math.min(lastPage, maxPages)

   if (page > maxPages / 2) {
      start = page - Math.floor(maxPages / 2)
      end = start + maxPages - 1

      if (end > lastPage) {
         end = lastPage
         start = Math.max(1, end - maxPages + 1)
      }
   }

   // カテゴリー関連
   const category_list = await getAkiyamaCategoryList()
   const category_name = await getAkiyamaCategory(cat_id)

   return (
      <div className={style.wrap}>
         <Header />
         <main className={style.main}>
            <div className={style.maindiv}>
               <h2 className={style.h2}>{category_name.name}のカテゴリー一覧</h2>
               <ul className={style.ul}>
                  {Yamata_news.contents.map((create) => (
                     <li key={create.id} className={style.li}>
                        <Link href={`/news/detail/${create.id}`}>{create.title}</Link>
                     </li>
                  ))

                  }
               </ul>
            </div>


            {/* ページネーション */}

            <br />
            <hr />
            <br />

            {/* 何件目表示  0325 */}
            <div className={style.pageInfo}>
               {((page - 1) * pageSize + 1)}〜
               {Math.min(page * pageSize, Yamata_news.totalCount)} 件目表示 / {Yamata_news.totalCount} 件
            </div>


            <div className={style.pagination}>
               {page === 1 ?
                  (
                     <span className={style.disabled}>＜ 前のページ</span>
                  ) : (
                     <Link href={`/news/category/${cat_id}/${page - 1}`} className={style.link}>＜ 前のページ</Link>
                  )}

               {/* ページ番号　0325 */}
               <Link href={`/news/category/${cat_id}/1`} className={page === 1 ? style.active : style.pageNumber}>1</Link>

               {/* 前側 ... */}
               {page > 4 && <span>...</span>}

               {Array.from({ length: lastPage }, (_, i) => i + 1)
                  .filter(p => p !== 1 && p !== lastPage)
                  .filter(p => {
                     if (page <= 3) return p <= 5           // 最初
                     if (page >= lastPage - 2) return p >= lastPage - 4 // 最後
                     return Math.abs(p - page) <= 2         // 中央
                  })
                  .map(p => (
                     <Link
                        key={p}
                        href={`/news/category/${cat_id}/${p}`}
                        className={page === p ? style.active : style.pageNumber}
                     >
                        {p}
                     </Link>
                  ))}

               {/* 後側 ... */}
               {page < lastPage - 3 && <span>...</span>}

               {lastPage !== 1 && (
                  <Link
                     href={`/news/category/${cat_id}/${lastPage}`}
                     className={page === lastPage ? style.active : style.pageNumber}
                  >
                     {lastPage}
                  </Link>
               )}


               {page === lastPage ? (
                  <span className={style.disabled}>次のページ ＞</span>
               ) : (
                  <Link href={`/news/category/${cat_id}/${page + 1}`} className={style.link}>次のページ ＞</Link>
               )
               }
            </div>

            {/* カテゴリーリスト */}
            <br />
            <hr />
            <br />
            <ul>
               {category_list.contents.map((create) => (
                  <li key={create.id}>
                     <Link href={`/news/category/${create.id}/1`}>{create.name}</Link>
                  </li>
               ))}
            </ul>



            {/* 最初・最後のページ */}
            {/* <br />
            <hr />
            <br /> */}
            {/* <div className={style.lastpagination}>
               {page === 1 ? (
                  <span className={style.disabled}>最初のページ</span>
               ) : (
                  <Link href={`/news/category/${cat_id}/1`}>最初のページ</Link>
               )}

               ｜

               {page === lastPage ? (
                  <span className={style.disabled}>最後のページ</span>
               ) : (
                  <a href={`/news/category/${cat_id}/${lastPage}`}>最後のページ</a>
               )}

            </div> */}

         </main>

         <br />
         <hr />
         <br />
         <Footer />
      </div>
   );
}

export default Page

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "ニュースページ",
//   description: "このサイトのニュースページです",
// };
