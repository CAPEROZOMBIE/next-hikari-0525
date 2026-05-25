// app\news\category\[cat_id]\[page]\page.tsx カテゴリー一覧

import style from "./cat_id.module.css";
import Header from "./../../../../components/Header";
import Footer from "./../../../../components/Footer";
import Aside from "./../../../../components/Aside"
import Image from "next/image";

import { getAkiyamaNews } from "./../../../../library/microcms"

// 月別アーカイブリスト用
// import { getAllAkiyamaNews } from "./../../../../library/microcms"

import Link from "next/link";
import { SearchForm } from "@/app/components/SearchForm";

//  試し-５月23日 remix
// カテゴリー関係
// import { getAkiyamaCategoryList } from "./../../../../library/microcms";

export const revalidate = 60;

// 谷口
import { taniguchi_Date } from "./../../../../library/taniguchi";


// これに置き換え ↓ タイトル

import { Metadata } from "next";
export async function generateMetadata({ params }: alltype): Promise<Metadata> {
    const res = await getAkiyamaNews({
        filters: `category[equals]${(await params).cat_id}`,
        limit: 1,
        fields: ["category"]
    });
    return {
        title: `${res.contents[0]?.category?.name}のカテゴリー`
    };
}



// ------------------------------------------------------


type alltype = { params: Promise<{ cat_id: string; page: string }> }

async function Page({ params }: alltype) {
    const { cat_id, page: pageParams } = await params;
    const page = Number(pageParams)

    const pageSize = 9
    const Akiyama_news = await getAkiyamaNews({

        filters: `category[equals]${cat_id}`,
        fields: ["id", "title", "category", "thumbnail", "publishedAt"],
        limit: pageSize,
        offset: (page - 1) * pageSize
    })

    const lastPage = Math.ceil(Akiyama_news.totalCount / pageSize)
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


    // 月別アーカイブリスト・リンク 0325
    // const allnews = await getAllAkiyamaNews({
    //     fields: ["publishedAt"]
    // })
    // const archives: Record<string, number> = {}

    // allnews.forEach((n) => {
    //     if (!n.publishedAt) return
    //     const d = new Date(n.publishedAt)
    //     const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`
    //     archives[key] = (archives[key] || 0) + 1
    // })

    // const archiveList = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]))

    

    //  試し-５月23日 remix// カテゴリーリスト
    // const category_list = await getAkiyamaCategoryList();

    return (
        <div className={style.wrap}>
            <Header />
            <main className={style.main}>

                <div>
                    <h2>{`${Akiyama_news.contents[0]?.category?.name}`}のカテゴリー</h2>
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

                {/* ページネーション */}
                <br />
                <hr />
                <br />

                {/* 何件目表示 10~13件 / 23件中 */}
                <div className={style.pageInfo}>
                    {((page - 1) * pageSize + 1)}〜
                    {Math.min(page * pageSize, Akiyama_news.totalCount)} 件目表示 / 全{Akiyama_news.totalCount} 件
                </div>

                {/* 前のページ */}
                <div className={style.pagination}>
                    {page === 1 ?
                        (
                            <span className={style.disabled}>＜ 前のページ</span>
                        ) : (
                            <Link href={`/news/category/${cat_id}/${page - 1}`} className={style.link}>＜ 前のページ</Link>
                        )}

                    {/* 真ん中の数字ゾーン */}

                    {/* ページ番号 */}
                    <Link href="/news/1" className={page === 1 ? style.active : style.pageNumber}>1</Link>

                    {/* 前側 ... */}
                    {page > 4 && <span>...</span>}

                    {Array.from({ length: lastPage }, (_, i) => i + 1)
                        .filter(p => p !== 1 && p !== lastPage)
                        .filter(p => {
                            if (page <= 3) return p <= 3          // 0326 最初の真ん中の数字 最初の1ふくむ
                            if (page >= lastPage - 2) return p >= lastPage - 2 // 0326 最後の数字から引く数
                            return Math.abs(p - page) <= 1         // 0326 中央 両脇の数
                        })
                        .map(p => (
                            <Link
                                key={p}
                                href={`/news/${p}`}
                                className={page === p ? style.active : style.pageNumber}
                            >
                                {p}
                            </Link>
                        ))}

                    {/* 後側 ... */}
                    {page < lastPage - 3 && <span>...</span>}

                    {lastPage !== 1 && (
                        <Link
                            href={`/news/${lastPage}`}
                            className={page === lastPage ? style.active : style.pageNumber}
                        >
                            {lastPage}
                        </Link>
                    )}

                    {/* 次のページ */}
                    {page === lastPage ? (
                        <span className={style.disabled}>次のページ ＞</span>
                    ) : (
                        <Link href={`/news/category/${cat_id}/${page + 1}`} className={style.link}>次のページ ＞</Link>
                    )
                    }
                </div>
                
                <Aside />
                {/* //  試し-５月23日 remix */}
                    {/* カテゴリーリスト */}
                    {/* <br />
                    <hr />
                    <br />
                    
                    <ul className={style.category_radius}>
                    {category_list.contents.map((create) => (
                        <li key={create.id}>
                            <Link href={`/news/category/${create.id}/1`}>{create.name}</Link>
                        </li>
                    ))}
                    </ul> */}

                {/* 月別アーカイブリスト */}

                {/* <br />
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
