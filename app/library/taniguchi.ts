// library\taniguchi.ts

export const taniguchi_Date = (dateString:string):string => {
   const date = new Date (dateString);
   return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日`;
}