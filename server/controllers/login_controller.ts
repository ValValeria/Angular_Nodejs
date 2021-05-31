import data from '../mysql/admin';
import validator from 'validator';

export class Login{
    
    static async login(req:any,resp:any){
        
         const isAdmin = await Login.process(req,resp);

         if(isAdmin){
             return resp.json({status:"admin"})
         }

         return resp.json({status:"user"})
    }

    static async process(req:any,resp:any){
        
        if(validator.isEmail(req.body.email) && validator.isLength(req.body.password,{max:20,min:4})){
            const {email,password} = req.body;
            const isAdmin = data.email == email && data.password == password;

            if(isAdmin){
                return true;
            }
        }

        return false;
    }
}