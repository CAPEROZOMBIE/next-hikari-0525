// news\[news_id]\page.tsx 月別一覧

import style from "./month_id.module.css";
import Header from "./../../../components/Header";
import Footer from "./../../../components/Footer";
import Image from "next/image";

import { getAkiyamaNews } from "./../../../library/microcms"

// 月別アーカイブリスト用
import { getAllAkiyamaNews } from "./../../../library/microcms"

import Link from "next/link";
import { SearchForm } from "@/app/components/SearchForm";

//  試し-５月23日 remix
// カテゴリー関係
import { getAkiyamaCategoryList } from "./../../../library/microcms";

export const revalidate = 60;

// 谷口
import { taniguchi_Date } from "./../../../library/taniguchi";

// タイトル
// import { Metadata } from "next";
// export const metadata: Metadata = {
//     title: "アーカイブ"
// };


// これに置き換え ↓ タイトル

import { Metadata } from "next";    

export async function generateMetadata({ params }: alltype): Promise<Metadata> {
    const { month_id } = await params;
    const [year, month] = month_id.split("-");

    return {
        title: `${year}年${Number(month)}月の一覧`
    };
}



// ------------------------------------------------------




type alltype = { params: Promise<{ month_id: string }> }

async function Page({ params }: alltype) {
    const { month_id } = await params;

    const Akiyama_news = await getAkiyamaNews({
        filters: `publishedAt[begins_with]${month_id}`,
        fields: ["id", "title", "publishedAt","thumbnail","category"],
        limit: 50,
    })

    //ノート次のページ    
    const all = await getAllAkiyamaNews({
        fields: "publishedAt"
    })

    const monthSet = new Set<string>()
    all.forEach((item) => {
        if (!item.publishedAt) return
        const d = new Date(item.publishedAt)
        const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
        monthSet.add(ym)
    })
    
    const monthList = Array.from(monthSet).sort((a, b) => b.localeCompare(a))
   
    const currentIndex = monthList.indexOf(month_id)
    const prevMonth = monthList[currentIndex + 1]
    const nextMonth = monthList[currentIndex - 1]

    // 次のノートページ
    
    const archives: Record<string, number> = {}
    all.forEach((n) => {
        if (!n.publishedAt) return
        const d = new Date(n.publishedAt)
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2,"0")}`
        archives[key] = (archives[key] || 0) + 1

    })

    const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))

    //  試し-５月23日 remix// カテゴリーリスト
    const category_list = await getAkiyamaCategoryList();

    return (
        <div className={style.wrap}>
            <Header />
            <main className={style.main}>

                <div>
                    {/* 試し */}
                    {/* <h2>{month_id}ニュース一覧ページ</h2> */}
                    {/* <h2>{`${d.getFullYear()}年${d.getMonth()+1}月`}ニュース一覧ページ</h2> */}
                    <h2>{`${month_id.split("-")[0]}年${Number(month_id.split("-")[1])}月`}の一覧</h2>
                    <div className="mt25"><SearchForm /></div>

                    <div className={style.articel_wrap}>
                        {Akiyama_news.contents.map((create) => (
                            <article key={create.id} className={style.article}>

                                <figure className={style.figure}>

                                    {create.thumbnail?.url ? (
                                        <Link href={`/news/detail/${create.id}`}>
                                            {/* <img src={create.thumbnail?.url} alt="" /> */}
                                            <Image
                                                src={create.thumbnail?.url}
                                                alt=""
                                                width={1}
                                                height={1}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </Link>
                                    ) : (
                                         <div className="noimage"><img src={"/noimage.svg"} alt="" /></div>
                                    )}
                                </figure>

                                <div className={style.right}>
                                    {/* <time>{create.publishedAt}</time> */}

                                    <time>{create.publishedAt && taniguchi_Date(create.publishedAt)}</time>

                                    <div><Link href={`/news/detail/${create.id}`}>{create.title}</Link></div>
                                    <div className={style.category_radius_map}><Link href={`/news/category/${create.category?.id}/1`}>{create.category?.name}</Link></div>
                                </div>
                            </article>
                        ))
                        }

                    </div>

                </div>

                {/* ナビ */}

                <br />
                <hr />
                <br />
                
                <nav className={style.archive_nav}>
                    {prevMonth?(
                        <a href={`/news/archive/${prevMonth}`}>＜ 前の月</a>
                    ):(
                        <span className={style.archive_nav_none}>＜ 前の月</span>
                    )
                }
                {""}
                {nextMonth?(
                    <a href={`/news/archive/${nextMonth}`}>次の月 ＞</a>
                ):(
                    <span className={style.archive_nav_none}>次の月 ＞</span>
                )}
                </nav>
                
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

            </main>

            <br />
            <hr />
            <br />
            <Footer />
        </div>
    );
}

export default Page
