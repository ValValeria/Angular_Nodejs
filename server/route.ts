import { Login } from './controllers/login_controller';
import { PostsController } from './controllers/posts_contoller';
import { IRoute } from "./interfaces/interfaces";
import {resolve} from 'path';

const routes:IRoute[]=[
    {method:"get",url:"/api/javascriptposts",isMiddleWare:false,h(...args){PostsController.get_posts(...args)}},
    {method:"get",url:"/api/mypost/:id",isMiddleWare:false,h(...args){PostsController.get_post(...args)}},
    {method:"post",url:"/api/login",isMiddleWare:false,h(...args){Login.login(...args)}},
    {method:"post",url:"/api/createpost",isMiddleWare:false,h(...args){PostsController.create_post(...args)},isCreate:true},
    {method:"get",url:"/api/categories",isMiddleWare:false,h(...args){PostsController.get_post_by_cat(...args)}},
    {method:"get",url:"/api/categories-sort",isMiddleWare:false,h(req,resp){PostsController.get_post_by_cat(req,resp,true)}},
    {method:"get",url:"/api/search",isMiddleWare:false,h(...args){PostsController.search(...args)}},
    {method:"get",url:"/api/deletePost",isMiddleWare:false,h(...args){PostsController.deletePost(...args)}},
    {method:"get",url:"/api/comments",isMiddleWare:false,h(...args){PostsController.getComments(...args)}},
    {method:"post",url:"/api/createcomments",isMiddleWare:false,h(...args){PostsController.createComment(...args)}}
]

export {routes}