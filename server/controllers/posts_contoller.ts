import { IPost, IResponse } from '../../src/app/Interfaces/Interfaces';
import { Com, Post } from '../mysql/connection_mysql';
import { Login } from './login_controller';
import {unlink} from 'fs';
import {resolve} from 'path';
import validator from 'validator';


const MAIN_IMG_NAME = "main_img_dfile";

export class PostsController{
     static per_page = 3;
     
     /**
      * Returns posts
      * @param req 
      * @param resp 
      */
     static async get_posts(req: any,resp: any){
          
            const page = req.query.page || 1;

            const posts = await Post.findAll({
                   limit:PostsController.per_page,
                   offset:PostsController.per_page*(page-1)
            });

            const posts_count = await Post.count();

            const response:IResponse = {posts:posts||[],posts_count:posts_count,posts_per_page:PostsController.per_page};

            resp.send(JSON.stringify(response));

            resp.end();

     }
     
     /**
      * Returns the post,which matches the id, specified in postId param
      * @param req 
      * @param resp 
      */
     static async get_post(req:any,resp:any){
            
            const post = await Post.findOne({
                   where:{
                          id:req.params.id||1
                   }
            });

            const response = {posts:[post||{}]};

            resp.json(response);
     }

     
     /**
      * Sorts by categories
      * @param req 
      * @param resp 
      */
     static async get_post_by_cat(req:any,resp:any,isCat:boolean = false){
            
       const { Op } = require("sequelize");

       const category = req.query.category;

       const page = req.query.page || 1;

       const pageSize = req.query.pageSize || PostsController.per_page;

       let obj = [{categories:"angular"},{categories:"react"}];

       if(isCat){
              if (category == "angular") {
                     obj.splice(1,1);
              } else {
                     obj.splice(0,1);
              }
       } 

       const post = await Post.findAll({
              attributes:{exclude:['content']},
              where:{
                     [Op.or]:[
                            ...obj
                     ]
              },
              offset:PostsController.per_page*(page-1),
              limit:pageSize
       });

       const response = {posts:post};

       resp.json(response);
     }

     /**
      * Creates a post
      * @param req 
      * @param resp 
      */
     static async create_post(req:any,resp:any){
           
           const isAdmin = PostsController.auth(req,resp).catch(e=>false)

           if(req.route.methods.post && Array.isArray(req.files)&& isAdmin){

               const body: IPost = req.body;  

               const img_file = req.files.find(el=>{
                      console.log(el)
                      return el.filename.includes(MAIN_IMG_NAME);
               })

               if(img_file && typeof body.title =="string" &&
                 typeof body.categories =="string" && typeof body.excerpt =="string"
               ){

                     const post = await Post.create({
                            title:body.title,
                            content:JSON.stringify(body.content),
                            img:'/assets/'+img_file.filename,
                            categories:body.categories,
                            excerpt:body.excerpt
                      });

                     return resp.send({status:"ok",id:post.id});
               } else {
                     resp.json({error:'Some errors has occured'})
               }
           } else {
                  resp.json({error:`Invalid data. File fields are empty`});
           }
     }

     /**
      * Looks for the posts, which contains specified letters in their title
      * @param req 
      * @param resp 
      */
     public static async search(req:any,resp:any){
           const word = req.query.search||"";
           const {Op} = require('sequelize');

           if(word.trim().length>3){

              const posts = await Post.findAll({
                     attributes:['title','id'],
                     where:{
                         title:{
                             [Op.substring]:word
                         }
                     }
              });

              return resp.json({posts:posts});

           } else {
              return resp.status(403);
           }
     }


     /**
      * Deletes the post specified in the id query
      * @param req 
      * @param resp 
      */
     public static async deletePost(req:any,resp:any){
       const isAdmin = await PostsController.auth(req,resp).catch(e=>false)
       const postId = req.query.id;

       if (isAdmin && postId) {
            const pathImage = await Post.findByPk(postId);

            if(pathImage){
              await Post.destroy({where:{id:postId}});
              unlink(resolve(pathImage.img),(_err)=>{});
            }
            
            resp.json({status:"Deleted"});
       } else {
            resp.status(403)
       }
     }
     
     /**
      * Checks if the user is admin
      * @param req 
      * @param resp
      * @throws Error 
      */
     public static async auth(req:any,resp:any){
              
       const auth = JSON.parse(req.get('auth'));

       const isAdmin = await Login.process({body:{email:auth.email,password:auth.password}},null);

       if(!isAdmin) throw new Error();

       return true;
     }

     /**
      * Creates comments, related to the specific post
      * @param req 
      * @param resp 
      */
     public static async createComment(req:any,resp:any){
         const postId = req.body.postId;
         const username = req.body.username;
         const message = req.body.message;

         if(postId){
              const post = await Post.findByPk(postId);

              const u_l = username.trim().length;
              const m_l = message.trim().length;
     
              if(post && u_l > 10 && u_l <20 && m_l<200 && m_l >10){
                     await post.createComment({username,message});
                     resp.json({status:"ok"})
              } else {
                     resp.json({status:""})
              }
         } else{
              resp.json({status:"Invalid postId. It is "+postId});
         }
     }


     public static async getComments(req:any,resp:any){
            const postId = Number(req.query.postId);

            if (postId) {
                   const post = await Post.findByPk(postId);
                   if(post){
                        return resp.json(await post.getComments())
                   }
            }

            return resp.json({error:"Not found"});
     }
}