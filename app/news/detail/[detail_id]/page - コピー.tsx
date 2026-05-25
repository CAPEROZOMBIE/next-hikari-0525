// app\news\detail\[detail_id]\page.tsx 詳細ページ

import style from "./detail_id.module.css";
import Header from "./../../../components/Header";
import Footer from "./../../../components/Footer";
// import Link from "next/link";

import { getAkiyamaNewsDetail } from "./../../../library/microcms";

// 試し
import { getAkiyamaNews } from "./../../../library/microcms";

export const revalidate = 60;

type alltype = { params: Promise<{ detail_id: string }> };

async function Page({ params }: alltype) {
   const { detail_id } = await params;
   const Yamata_news_Detail = await getAkiyamaNewsDetail(detail_id, {
      fields: ["id", "title", "content", "category", "publishedAt"],
   });

   console.log(Yamata_news_Detail.title);
   console.log(Yamata_news_Detail.category.name);

   //   試し
   const around = await getAkiyamaNews({
      orders: "-publishedAt",
      limit: 50,
   });

   const index = around.contents.findIndex((item) => item.id === detail_id);

   const prev = around.contents[index + 1];
   const next = around.contents[index - 1];

   return (
      <div className={style.wrap}>
         <Header />

         <main className={style.main}>
            <div className={style.maindiv}>
               <h2 className={style.h2}>詳細ページ</h2>
               {Yamata_news_Detail.title}
               <div>{Yamata_news_Detail.content}</div>
               <br />
               <div>{Yamata_news_Detail.category.name}</div>

            </div>
            <br></br>
            <hr></hr>
            <br></br>

            {/* 試し */}

            <div className={style.paginavi}>
               <span>{prev && <a href={`/news/detail/${prev.id}`}>前の記事</a>}</span>
               <span>{next && <a href={`/news/detail/${next.id}`}>次の記事</a>}</span>
            </div>

         </main>

         <br />
         <hr />
         <br />
         <Footer />
      </div>
   );
}

export default Page;

// 

// import type { Metadata } from "next";

// export const metadata: Metadata = {
//    title: "詳細ページ",
//    description: "このサイトの詳細ページ",
// };
