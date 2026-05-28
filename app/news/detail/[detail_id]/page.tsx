// app\news\detail\[detail_id]\page.tsx 詳細ページ

import style from "./detail_id.module.css";
import Header from "./../../../components/Header";
import Footer from "./../../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import Aside from "./../../../components/Aside";

import { taniguchi_Date } from "./../../../library/taniguchi";

import { getAkiyamaNewsDetail } from "./../../../library/microcms";

// 試し
import { getAkiyamaNews } from "./../../../library/microcms";

export const revalidate = 60;

type alltype = { params: Promise<{ detail_id: string }> };

async function Page({ params }: alltype) {
   const { detail_id } = await params;
   const Yamata_news_Detail = await getAkiyamaNewsDetail(detail_id, {
      fields: ["id", "title", "content", "category", "publishedAt", "thumbnail"],
   });

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
                
               <h2 className={style.h2}>{Yamata_news_Detail.title}</h2>
               <div className={`${style.time_category_flex} mt25-10`}>
                    <time>{Yamata_news_Detail.publishedAt && taniguchi_Date(Yamata_news_Detail.publishedAt)}</time>
                    <div className={style.category_radius_map}>
                        <Link href={`/news/category/${Yamata_news_Detail.category?.id}/1`}>
                            {Yamata_news_Detail.category?.name}
                        </Link>
                        </div>
               </div>
                
                {/* 写真とテキスト内容ラップ */}
                <div className={`${style.contents_flex} mt25`}>
                    <figure className={style.figure}>
                        {Yamata_news_Detail.thumbnail?.url && (
                        <Image 
                            src={Yamata_news_Detail.thumbnail?.url}
                            alt=""
                            width={700}
                            height={400}
                            priority
                            style={{ width: "100%", height: "auto" }}
                            sizes="(max-width: 768px) 100vw, 800px"
                        />
                        )}
                    </figure>
                    
                    <div className={style.contet_main} dangerouslySetInnerHTML={{ __html: Yamata_news_Detail.content }} />
                    
               </div>

            </div>
            <br></br>
            <hr></hr>
            <br></br>

            {/* 試し */}

            {/* <div className={style.paginavi}>
               <span>{prev && <a href={`/news/detail/${prev.id}`}>前の記事</a>}</span>
               <span>{next && <a href={`/news/detail/${next.id}`}>次の記事</a>}</span>
            </div> */}


            {/* 試し0325 リンクできないように。無い記事時 */}
            <div className={style.paginavi}>
               <span>
                  {next ? (
                     <a href={`/news/detail/${next.id}`}>＜ 前の記事</a>
                  ) : (
                     <span className={style.disabled}>＜ 前の記事</span>
                  )}
               </span>
            
               <span>
                  {prev ? (
                     <a href={`/news/detail/${prev.id}`}>次の記事 ＞</a>
                  ) : (
                     <span className={style.disabled}>次の記事 ＞</span>
                  )}
               </span>
            </div>
            
            <Aside />

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
