export interface IRoute{
    method:"get"|"post"|"all",
    url:string,
    isMiddleWare:boolean,
    h:(req: any,resp: any)=>any,
    isCreate?:boolean
}