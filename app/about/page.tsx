// app\about\page.tsx アバウトページ

import Image from "next/image";
import style from "./about.module.css";
import Header from "./../components/Header";
import Footer from "./../components/Footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "アバウトページ",
  description: "このサイトのアバウトページです",
};


export default async function About() {
   return (
      <div className={style.wrap}>
         <Header />
         <main className={style.main}>
               <figure className={style.figureWrap}>
                  <Image 
                        src={"/top-main3.jpg"}
                        width={1000}
                        height={500}
                        alt=""
                        quality={100}
                        priority
                   />
               </figure>
               <p className={style.ptext}>このサイトは、Next.js 16.1.6 + microcmsで制作したサンプルサイトです。</p>

         </main>
         <Footer />
      </div>
   );
}
