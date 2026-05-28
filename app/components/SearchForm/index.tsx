// components\SearchForm\index.tsx

"use client"

import styles from "./index.module.css"
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SearchFormComponent() {
   // function SearchForm() {
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const q = e.currentTarget.elements.namedItem('q');
      if (q instanceof HTMLInputElement) {

         const value = q.value.trim(); //追加 空き検索対策
         if (!value) return;  //追加 空き検索対策

         const params = new URLSearchParams();
         params.set('q', value); //修正 空き検索対策
         router.push(`/news/searchout?${params.toString()}`);
      }
   }

   return (
      <>
         <form onSubmit={handleSubmit} className={styles.form}>
            {/* <label className={styles.search} > */}
            <label>
               <input
                  type="text"
                  name="q"
                  autoComplete="on"
                  defaultValue={searchParams.get("q") ?? undefined}
                  placeholder=""
                  className={styles.searchInput}
               />
            </label>

            <button type="submit" className={styles.kensaku}>検索</button>
         </form>
      </>
   )
}

//  SearchFieldComponent ()　このページでsuspenseして、SearchBoxでexport

function SearchForm() {
   return (
      <Suspense>
         <SearchFormComponent />
      </Suspense>
   )
}
export { SearchForm }