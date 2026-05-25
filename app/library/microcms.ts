// library\microcms.ts

import { MicroCMSQueries } from "microcms-js-sdk"
import { MicroCMSImage } from "microcms-js-sdk"
import { MicroCMSListContent } from "microcms-js-sdk"
import { createClient } from "microcms-js-sdk"

// 型

export type MyAkiNews = {
   title:string
   content:string
   thumbnail?:MicroCMSImage
   category?:MyAkiCategory;
} & MicroCMSListContent

export type MyAkiCategory = {
   name:string
} & MicroCMSListContent


// ニュース複数

export const getAkiyamaNews = async(
   queries?:MicroCMSQueries) => {
      const A = await client.getList<MyAkiNews>({
         endpoint : "news",
         queries
      })
      return A
}


// ニュース全部

export const getAllAkiyamaNews = async(
   queries?:MicroCMSQueries) => {
      const B = await client.getAllContents<MyAkiNews>({
         endpoint : "news",
         queries
      })
      return B
}


// ニュース単一

export const getAkiyamaNewsDetail = async(
   contentId:string,
   queries?:MicroCMSQueries
) => {
      const C = await client.getListDetail<MyAkiNews>({
         endpoint : "news",
         contentId,
         queries
      })
      return C
}


// カテゴリー単一

export const getAkiyamaCategory = async (contentId:string) => {
   const D = await client.getListDetail<MyAkiCategory>({
      endpoint:"categories",
      contentId
   })
   return D
}

// カテゴリー複数

export const getAkiyamaCategoryList = async () => {
   const E = await client.getList<MyAkiCategory>({
      endpoint : "categories"
   })
   return E
}


// env 

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
   throw new Error("MICROCMS_SERVICE_DOMAIN is required")
}
if (!process.env.MICROCMS_API_KEY) {
   throw new Error("MICROCMS_API_KEY is required")
}
const client = createClient({
   serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
   apiKey: process.env.MICROCMS_API_KEY
})








