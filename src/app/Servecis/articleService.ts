import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { articleModel } from '../Models/ArticleModel';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class articleService {
    
constructor( private http: HttpClient , private router :Router) {}
article !: any
readingArticle = new Subject<boolean>()
isReading = new Subject<boolean>()
articleToRead! :string
saveArticle(title : string|null , arr : Array<string> , name : string , image : string){
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    const fulldate=day+'-'+month+'-'+year
    
    const obj={
        title: title,
        arr :arr ,
        autherName: name,
        autherIcone : image,
        formatDate : fulldate
    }
    this.http.post<{_id :string}>('https://blog-in-opal.vercel.app/article/save' ,obj).subscribe(res=>{
       
        this.router.navigate([`/edite/${res._id}`])
        
    })
    
}
getArticle(id :string){

    const obj ={
        id: id
    }
   return this.http.post<{scheduleDate:Date,isPublish:boolean,views : Array<string>, auther:string,collaborators : Array<string>,autherName :string ,sections: Array<string> , title :string , tags :Array<object> ,rating :Array<{id:string , stars:number}>}>('https://blog-in-opal.vercel.app/article' ,obj)
   
}
updateArticle(id : string , title :string|null , sections : Array<string>){
    const obj={
        id :id ,
        title :title ,
        sections :sections
    }
 return   this.http.post<{sections: Array<string> , title :string}>('https://blog-in-opal.vercel.app/article/update' ,obj)
}
getFinishArticles(){
    return   this.http.get('https://blog-in-opal.vercel.app/article/finished' )

}
getCollabrationArticles(){
  return   this.http.get('https://blog-in-opal.vercel.app/article/collaboration' )

}
getCollabrationArticlesForStats(){
  return   this.http.get('https://blog-in-opal.vercel.app/article/collaborationForStats' )

}
getOtherFinishArticles(id :string){
  const obj={
    id: id
  }
  return   this.http.post('https://blog-in-opal.vercel.app/article/otherFinished' ,obj )

}
getUnfinishArticles(){
    return   this.http.get('https://blog-in-opal.vercel.app/article/workingOn')

}
getAllArticles(nb?: number){
 if(nb){
  const query = `?nbArticle=${10*nb}`
    return   this.http.get('https://blog-in-opal.vercel.app/article/all'+query)
 }
  const query = `?nbArticle=${10}`
    return   this.http.get<any>('https://blog-in-opal.vercel.app/article/all'+query)

}
getTrendingTags(){
  return   this.http.get('https://blog-in-opal.vercel.app/article/trendingTags')
}
getArticleWantToRead(){
  return   this.http.get('https://blog-in-opal.vercel.app/article/articleWantToRead')
}
publishArticle(id:string , tags : any){
    const obj ={
        id :id ,
        tags:tags
    }
    console.log(obj);
    
    return   this.http.post('https://blog-in-opal.vercel.app/article/publishArticle',obj )
}
searchArticle(name :string){
    const obj ={
      name :name
    }
    return this.http.post('https://blog-in-opal.vercel.app/article/searchArticle' ,obj)
  
  }

  likeArticle(id :string , isLikedByUser :boolean , auther :string , collabs : string[]){
    const obj ={
        id :id,
        isLikedByUser :isLikedByUser,
        auther: auther ,
        collabs :collabs
      }
    return   this.http.post('https://blog-in-opal.vercel.app/article/like',obj)

  }

  ratingArticle(id :string , nbStars : number){
    const obj ={
        id :id,
       nbStars:nbStars
      }
    return   this.http.post('https://blog-in-opal.vercel.app/article/ratingArticle',obj)
  }

  searchInOtherProfile(id :string , itemToSearch : string){
    const obj ={
      id :id,
     itemToSearch :itemToSearch
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/searchInOtherProfile',obj)
  }

  searchByTagInOtherProfile( itemToSearch :Array<string | null>, id? :string ){
    const obj ={
      id :id,
     itemToSearch :itemToSearch
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/searchByTagInOtherProfile',obj)
  }  

  addCollaborator(id :string ){
    const obj ={
      id :id,
  
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/addCollaborator',obj)
  } 
  getCollaborators(collaborators :Array<string> ){
    const obj ={
      collaborators :collaborators,
  
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/getCollaborators',obj)
  }
  
  readLaterArticle(id:string , allRadyExist : boolean){
    const obj ={
      id:id,
      allRadyExist : allRadyExist
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/readLater',obj)
  } 
  setReadTime(id:string , readTime : number){
    const obj ={
      id:id,
      readTime : readTime
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/setReadTime',obj)
  }
  setArticleViews(id:string , allRadyExist : boolean , auther : string , collabs : string[]){
    const obj ={
      id:id,
      allRadyExist : allRadyExist,
      auther : auther,
      collabs : collabs

    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/setArticleViews',obj)
  }  
  getReadLaterArticles(readLater : string[]){
    const obj ={
      readLater :readLater
    }
  return   this.http.post('https://blog-in-opal.vercel.app/article/getReadLaterArticles',obj)
  } 
  deleteArticle(id:string) {
    const obj ={
      id:id,
    }
    return   this.http.post('https://blog-in-opal.vercel.app/article/delete',obj)
  }
  switchCommentStat(id:string ,disabled:boolean){
    const obj ={
      id:id ,
      disabled:disabled
    }
    return   this.http.post('https://blog-in-opal.vercel.app/article/switchCommentStat',obj) 
  }

  attachUser(id:string ,exist:boolean){
    const obj ={
      id:id ,
      exist :exist
    }
    return   this.http.post('https://blog-in-opal.vercel.app/article/attachUser',obj) 
  }

  schedule(obj:any){
   
    return   this.http.post('https://blog-in-opal.vercel.app/article/schedule',obj) 
  }
  reschedule(obj:any){
   
    return   this.http.post('https://blog-in-opal.vercel.app/article/reschedule',obj) 
  }
  cancelSchedule(obj:any){
   
    return   this.http.post('https://blog-in-opal.vercel.app/article/cancelSchedule',obj) 
  }
  rankingpoints(){
    return   this.http.get<{views:number , shares:number , likes :number}>('https://blog-in-opal.vercel.app/article/rankingpoints')
  }
}