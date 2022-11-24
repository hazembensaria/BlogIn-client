import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';
import { ReportComponent } from '../dialog/report/report.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  tag!:string | null
  articles:any=[]
  isConnected!:boolean
  tags:any =[]
  user! :any
  old = 1
  constructor(private notificationService : NotificationService , public dialog : MatDialog,private notificationSerce:NotificationService, private route :ActivatedRoute  , private userService : UserService ,private articleService : articleService , private router :Router) { }

  ngOnInit(): void {

    this.isConnected = this.userService.islogednow
    if(this.isConnected){
      this.userService.getUser().subscribe(res=>{
        this.user =res
        this.articleService.getReadLaterArticles(res.history).subscribe(articles=>{
          this.articles=articles
        })     
      }) 
      
    }
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
   
   likePost(id :string , isLikedByUser : boolean  , index :number , auther : string , collabs : string[]){
    this.articleService.likeArticle(id , isLikedByUser , auther  ,collabs).subscribe(res=>{
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
    

  report(id :string , title:string ) {
    this.notificationSerce.notificationTitle=title
    this.notificationSerce.notificationId = id
    this.dialog.open(ReportComponent)
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
}
