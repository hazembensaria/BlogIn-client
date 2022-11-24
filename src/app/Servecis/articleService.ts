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
    this.http.post<{_id :string}>('http://localhost:7000/article/save' ,obj).subscribe(res=>{
       
        this.router.navigate([`/edite/${res._id}`])
        
    })
    
}
getArticle(id :string){

    const obj ={
        id: id
    }
   return this.http.post<{scheduleDate:Date,isPublish:boolean,views : Array<string>, auther:string,collaborators : Array<string>,autherName :string ,sections: Array<string> , title :string , tags :Array<object> ,rating :Array<{id:string , stars:number}>}>('http://localhost:7000/article' ,obj)
   
}
updateArticle(id : string , title :string|null , sections : Array<string>){
    const obj={
        id :id ,
        title :title ,
        sections :sections
    }
 return   this.http.post<{sections: Array<string> , title :string}>('http://localhost:7000/article/update' ,obj)
}
getFinishArticles(){
    return   this.http.get('http://localhost:7000/article/finished' )

}
getCollabrationArticles(){
  return   this.http.get('http://localhost:7000/article/collaboration' )

}
getCollabrationArticlesForStats(){
  return   this.http.get('http://localhost:7000/article/collaborationForStats' )

}
getOtherFinishArticles(id :string){
  const obj={
    id: id
  }
  return   this.http.post('http://localhost:7000/article/otherFinished' ,obj )

}
getUnfinishArticles(){
    return   this.http.get('http://localhost:7000/article/workingOn')

}
getAllArticles(nb?: number){
 if(nb){
  const query = `?nbArticle=${10*nb}`
    return   this.http.get('https://blog-in-hazembensaria.vercel.app/article/all'+query)
 }
  const query = `?nbArticle=${10}`
    return   this.http.get<any>('https://blog-in-hazembensaria.vercel.app/article/all'+query)

}
getTrendingTags(){
  return   this.http.get('http://localhost:7000/article/trendingTags')
}
getArticleWantToRead(){
  return   this.http.get('http://localhost:7000/article/articleWantToRead')
}
publishArticle(id:string , tags : any){
    const obj ={
        id :id ,
        tags:tags
    }
    console.log(obj);
    
    return   this.http.post('http://localhost:7000/article/publishArticle',obj )
}
searchArticle(name :string){
    const obj ={
      name :name
    }
    return this.http.post('http://localhost:7000/article/searchArticle' ,obj)
  
  }

  likeArticle(id :string , isLikedByUser :boolean , auther :string , collabs : string[]){
    const obj ={
        id :id,
        isLikedByUser :isLikedByUser,
        auther: auther ,
        collabs :collabs
      }
    return   this.http.post('http://localhost:7000/article/like',obj)

  }

  ratingArticle(id :string , nbStars : number){
    const obj ={
        id :id,
       nbStars:nbStars
      }
    return   this.http.post('http://localhost:7000/article/ratingArticle',obj)
  }

  searchInOtherProfile(id :string , itemToSearch : string){
    const obj ={
      id :id,
     itemToSearch :itemToSearch
    }
  return   this.http.post('http://localhost:7000/article/searchInOtherProfile',obj)
  }

  searchByTagInOtherProfile( itemToSearch :Array<string | null>, id? :string ){
    const obj ={
      id :id,
     itemToSearch :itemToSearch
    }
  return   this.http.post('http://localhost:7000/article/searchByTagInOtherProfile',obj)
  }  

  addCollaborator(id :string ){
    const obj ={
      id :id,
  
    }
  return   this.http.post('http://localhost:7000/article/addCollaborator',obj)
  } 
  getCollaborators(collaborators :Array<string> ){
    const obj ={
      collaborators :collaborators,
  
    }
  return   this.http.post('http://localhost:7000/article/getCollaborators',obj)
  }
  
  readLaterArticle(id:string , allRadyExist : boolean){
    const obj ={
      id:id,
      allRadyExist : allRadyExist
    }
  return   this.http.post('http://localhost:7000/article/readLater',obj)
  } 
  setReadTime(id:string , readTime : number){
    const obj ={
      id:id,
      readTime : readTime
    }
  return   this.http.post('http://localhost:7000/article/setReadTime',obj)
  }
  setArticleViews(id:string , allRadyExist : boolean , auther : string , collabs : string[]){
    const obj ={
      id:id,
      allRadyExist : allRadyExist,
      auther : auther,
      collabs : collabs

    }
  return   this.http.post('http://localhost:7000/article/setArticleViews',obj)
  }  
  getReadLaterArticles(readLater : string[]){
    const obj ={
      readLater :readLater
    }
  return   this.http.post('http://localhost:7000/article/getReadLaterArticles',obj)
  } 
  deleteArticle(id:string) {
    const obj ={
      id:id,
    }
    return   this.http.post('http://localhost:7000/article/delete',obj)
  }
  switchCommentStat(id:string ,disabled:boolean){
    const obj ={
      id:id ,
      disabled:disabled
    }
    return   this.http.post('http://localhost:7000/article/switchCommentStat',obj) 
  }

  attachUser(id:string ,exist:boolean){
    const obj ={
      id:id ,
      exist :exist
    }
    return   this.http.post('http://localhost:7000/article/attachUser',obj) 
  }

  schedule(obj:any){
   
    return   this.http.post('http://localhost:7000/article/schedule',obj) 
  }
  reschedule(obj:any){
   
    return   this.http.post('http://localhost:7000/article/reschedule',obj) 
  }
  cancelSchedule(obj:any){
   
    return   this.http.post('http://localhost:7000/article/cancelSchedule',obj) 
  }
  rankingpoints(){
    return   this.http.get<{views:number , shares:number , likes :number}>('http://localhost:7000/article/rankingpoints')
  }
}