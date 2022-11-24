import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';
import { ReportComponent } from '../dialog/report/report.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {
  articles! :any
  submitSearch =false
  itemToSearch :string =''
  usersSearched! :any
  articleSearched! :any
  readTime = 0
  old = 1
  isConnected =false
  popularUsers : any=[]
  ArticleWantToRead: any=[]
  TrendingTags:any=[]
  user! :any
 

  constructor(public dialog : MatDialog,private notificationSerce:NotificationService, private userService : UserService , private articleService : articleService , private router :Router ,private notificationService :NotificationService) {
 
   }


  ngOnInit(): void {
    this.articleService.getTrendingTags().subscribe(res=>this.TrendingTags=res)
    this.userService.getPopularUser().subscribe(res=>this.popularUsers=res
    )

    this.isConnected = this.userService.islogednow
    this.userService.authListner.subscribe(next=>{
      if(next)
      this.isConnected =true
      else{
        this.isConnected =false
      }
    })

    if(this.isConnected){
      this.userService.getUser().subscribe(res=>{
        this.user =res     
      }) 
      this.articleService.getArticleWantToRead().subscribe(res=>this.ArticleWantToRead=res
      )
    }
   this.articleService.getAllArticles().subscribe(res=>{
    this.articles=res
    console.log(this.articles);
    
    this.articles.forEach((article:any)=>{Object.assign(article ,{avg:this.calculAvregeRating(article.rating)})})
   })
  }
calculAvregeRating(arr :Array<{id :string , stars :number}>){
  let somme = 0 ;
arr.forEach(val=>{somme+=val.stars})
if(this.isInt(somme/arr.length))
return (somme/arr.length)
 return (somme/arr.length).toFixed(2)
}
isInt(n : number) {
  return n % 1 === 0;
}


  @HostListener('mouseup',['$event'])

  listen(){  
    setTimeout(() => {
      this.submitSearch=false
    }, 10);
 
  }
  onScroll() {
    this.loadMoreArticles()
  }
onSubmit(){
  if(this.itemToSearch){
    this.submitSearch =true
    this.userService.searchUser(this.itemToSearch).subscribe(res => {
      this.usersSearched = res;
  
    })
    this.articleService.searchArticle(this.itemToSearch).subscribe(res=>{
      this.articleSearched =res
    })
  }
  }
  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
  likePost(id :string , isLikedByUser : boolean  , index :number ,auther:string , collabs : string[]){
    this.articleService.likeArticle(id , isLikedByUser , auther , collabs).subscribe(res=>{
      if(isLikedByUser){
        this.articles[index].likes.splice( this.articles[index].likes.indexOf(this.user._id),1) 
      }else{
        this.articles[index].likes.push(this.user._id)
        this.sendNotification(id,auther)
      }
    })
  }
  visitProfil(id :string){
    this.router.navigate([`/visit/${id}`])
  }
  openDialog(id :string , title :string , exist :any , auther : string , collabs : string[]) {
    this.notificationSerce.notificationTitle=title
    this.notificationSerce.notificationId = id
    this.notificationSerce.exist = exist ;
    this.notificationSerce.auther = auther
    this.notificationSerce.collabs = collabs
    
    this.dialog.open(AddCollaboratorsComponent)
  } 

  report(id :string , title:string ) {
    this.notificationSerce.notificationTitle=title
    this.notificationSerce.notificationId = id
   
    this.dialog.open(ReportComponent)
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
  loadMoreArticles(){
   this.old++
    this.articleService.getAllArticles(this.old).subscribe(res=>{
      this.articles=res
      this.articles.forEach((article:any)=>{Object.assign(article ,{avg:this.calculAvregeRating(article.rating)})})
    })
  }
  followUser(id:string){
    this.userService.followUser(id).subscribe(res=>{
     console.log(res);
     this.sendFollowNotificationForOther(id)

    })
   }
   searchByTag(tag:string){
    this.router.navigate([`tag/${tag}`])
   } 

   attachUser(id:string ,attachUser :string[] , index :number){
    this.articleService.attachUser(id ,attachUser.includes(this.user._id) ).subscribe(res=>{
      if(attachUser.includes(this.user._id)){ 
      this.articles[index].attachedUsers.splice(attachUser.indexOf(this.user._id),1);
        }else
        {
        this.articles[index].attachedUsers.push(this.user._id)
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

  sendFollowNotificationForOther(id:string){
    console.log('i am sending now');
    
    const obj={
      sender : this.user._id,
      recever : [id],
      senderIcon :this.user.image,
      senderName : this.user.name,
      type : 'follow',
    }
    this.notificationService.sendShareNotification(obj).subscribe(res=>{
      console.log('sdfqlksdf,kj');
      
      this.notificationService.socket.emit('sendFollowNotification' , id)
    })
  }
}
