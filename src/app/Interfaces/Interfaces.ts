export interface IList{
  link: string,
  txt: string
}

export interface IPost{
     title:string,
     img:string,
     categories:"angular"|"react"|"nodejs",
     id:number,
     content:IContent[]
     excerpt:string
}

export interface IContent{
         p?:string,
         ul?:string[],
         code?:string[],
         img?:string,
         h1?:string,
         li?:string
}

export interface IComments{
        id?:string,
        message:string,
        username:string
}

export interface IResponse{
    posts:IPost[],
    latest_posts?:IPost[],
    posts_count:number,//page count
    posts_per_page:number
}
