
import{Request, Response} from 'express';
import {User} from '../models/User';

export const ping =  (req: Request, res:Response) =>{
     res.json({pon:true}); 
}
export const register = async (req: Request, res:Response) =>{
    if (req.body.email&& req.body.password){
    let{email, password} = req.body; 

    let hasUser = await User.findOne({where: {email}}); 
   if(!hasUser){
       let newUser = await User.create({email, password});
       res.status(201); 
       res.json({id:newUser.id});
   }else{
   res.json({erro:"E-mail ja existe"}); 
}
   res.json ({error: "E-mail e/ou senha não enviados"});
    }
}
export const login = async (req:Request, res:Response) => {
     if(req.body.email && req.body.password){
         let email: string = req.body.email; 
         let password: String = req.body.password; 

         let user = await User.findOne({
             where: {email, password} 
         }); 
          if(user){
              res.json({status:true}); 
            return;
          }
        }
           res.json({status:false});
     }
export const list = async (req:Request, res:Response) => {
    let users = await User.findAll(); 
    let list: string [] = [];
    for(let i in users){
        list.push(users[i].email); 
    }
    res.json({list});
}
export const showUpForm = async(req: Request, res: Response) => {
    res.type("text/html");
    res.end(`
    <form method="POST" action="/upload" encType="multipart/form-data">
    <div id="cadastro">
    <form method="post" action=""> 
      <h1>Cadastro</h1> 
       
      <p> 
        <label for="nome_cad">Seu nome</label>
        <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="nome" />
      </p>
       
      <p> 
        <label for="email_cad">Seu e-mail</label>
        <input id="email_cad" name="email_cad" required="required" type="email" placeholder="leaozinho@gmail.com"/> 
      </p>
       
      <p> 
        <label for="senha_cad">Sua senha</label>
        <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="ex. 1234"/>
      </p>
       
      <p> 
        <input type="submit" value="Cadastrar"/> 
      </p>
       
      <p class="link">  
        Já tem conta?
        <a href="#paralogin"> Ir para Login </a>
      </p>
    </form>
  </div>`);
 }