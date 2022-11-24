import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class commentService {
    
constructor( private http: HttpClient , private router :Router) {}
saveComment(auther : string , autherName : string , autherIcone : string , content : string ,articleId:string ){
    const obj={
        auther:auther,
        autherName:autherName,
        autherIcone:autherIcone,
        content:content,
        articleId:articleId
    }
   return this.http.post('https://blog-in-opal.vercel.app/comment/save' ,obj)
}

getComments(obj :any){
    console.log(obj);
    
    return   this.http.post('https://blog-in-opal.vercel.app/comment/get',obj)
  } 
  likeComment(id :string , isLikedByUser :boolean){
    const obj ={
        id :id,
        isLikedByUser :isLikedByUser
      }
    return   this.http.post('https://blog-in-opal.vercel.app/comment/like',obj)

  }
}