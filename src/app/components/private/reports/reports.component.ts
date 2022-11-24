import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { reportService } from 'src/app/Servecis/reportService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../../dialog/add-collaborators/add-collaborators.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
articles:any=[]
tag!:string | null
isConnected!:boolean
tags:any =[]
user! :any
date:any
old = 1
  reports: any=[]
constructor(private notificationService :NotificationService , public dialog : MatDialog,private notificationSerce:NotificationService,private reportService :reportService, private route :ActivatedRoute  , private userService : UserService ,private articleService : articleService , private router :Router) { }

  ngOnInit(): void {
    this.reportService.getArticlesReported().subscribe(res=>{
      this.articles=res
  
    })
  }



  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
  visitProfil(id :string){
    this.router.navigate([`/visit/${id}`])
  }
  searchByTag(tag:string){
    this.tags=[]
    this.router.navigate([`tag/${tag}`])
   }
   
   likePost(id :string , isLikedByUser : boolean  , index :number , auther :string , collabs : string[]){
    this.articleService.likeArticle(id , isLikedByUser ,auther , collabs).subscribe(res=>{
      if(isLikedByUser){
        this.articles[index].likes.splice( this.articles[index].likes.indexOf(this.user._id),1) 
      }else{
        this.articles[index].likes.push(this.user._id)
        this.sendNotification(id,auther)
      }
    })
  }
  sendNotification(articleId :string , auther :string){
    console.log('i am sending now');
    
    const obj={
      sender : this.user._id,
      recever : [auther],
      senderIcon :this.user.image,
      senderName : this.user.name,
      articleId : articleId,
      type : 'like',
    }
    this.notificationService.sendShareNotification(obj).subscribe(res=>{
      console.log('sdfqlksdf,kj');
      
      this.notificationService.socket.emit('sendFollowNotification' , auther)
    })
  }
  readLaterArticle(id :string){
    this.articleService.readLaterArticle(id ,this.user.readLater.includes(id) ).subscribe(res=>{
      if(this.user.readLater.includes(id) ){
        this.user.readLater.splice(this.user.readLater.indexOf(id),1) ;
        return
      }
        this.user.readLater.push(id)
    })
  }
  openDialog(id :string , title :string , exist :any , auther : string , collabs : string[]) {
    this.notificationSerce.notificationTitle=title
    this.notificationSerce.notificationId = id
    this.notificationSerce.exist = exist ;
    this.notificationSerce.auther = auther
    this.notificationSerce.collabs = collabs
    
    this.dialog.open(AddCollaboratorsComponent)
  } 

  loadMoreArticles(){
    this.old++
     this.articleService.getAllArticles(this.old).subscribe(res=>{
       this.articles=res
       this.articles.forEach((article:any)=>{Object.assign(article ,{avg:this.calculAvregeRating(article.rating)})})
     })
   } 

   calculAvregeRating(arr :Array<{id :string , stars :number}>){
    let somme = 0 ;
  arr.forEach(val=>{somme+=val.stars})
   return somme/arr.length
  }  

  getReports(id:string){
    console.log(this.date);
    
    this.reportService.getReports(id).subscribe(res=>{
      console.log(res);
      
   this.reports=res;
      
    })
  }
}
