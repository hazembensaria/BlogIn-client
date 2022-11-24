import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';
import { ReportComponent } from '../dialog/report/report.component';

@Component({
  selector: 'app-other-profil',
  templateUrl: './other-profil.component.html',
  styleUrls: ['./other-profil.component.css']
})
export class OtherProfilComponent implements OnInit {
userId !:any
user :any
currentUser :any
articles :any
submitSearch =false
itemToSearch :string =''
articleSearched!:any
moveToUp='init'
searchedTags : string[] =[]
followersOrFollowings :any=[]
showFoloowersOrFollowings:boolean=false
tags  =new Set<{name : string}>()
  constructor(public dialog : MatDialog, private route :ActivatedRoute  , private userService : UserService ,private articleService : articleService , private router :Router , private notificationService :NotificationService) { }
  @HostListener('mouseup',['$event'])
  listen(){
    setTimeout(() => {
      this.submitSearch=false
    }, 10);
 
  }
moveDiveRight(){
  if(this.moveToUp=='init' ||this.moveToUp=='up' )
  {this.moveToUp='down'
  console.log(this.moveToUp);
  
  return}
  else
  {this.moveToUp='up'
  console.log(this.moveToUp);

  return}
}

  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      this.currentUser =res
    })
    this.route.paramMap.subscribe(param=>{
      this.userId=param.get("id")
        this.userService.getUserById(this.userId).subscribe(user=>{
         this.user =user
         console.log(this.user);
        this.getOtherFinishArticles()
        }) 

    })
  }
  getOtherFinishArticles(){
    this.articleService.getOtherFinishArticles(this.userId).subscribe(articles=>{
      this.articles =articles
         
      this.articles.forEach((article:any)=>{Object.assign(article ,{avg:this.calculAvregeRating(article.rating)})})

      
     })
  }
  stat(){
    this.router.navigate(["stats"])
    
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
  
  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
  likePost(id :string , isLikedByUser : boolean  , index :number , auther :string , collabs : string[]){
    console.log(this.articles[index].likes);
    this.articleService.likeArticle(id , isLikedByUser ,auther , collabs).subscribe(res=>{
      if(isLikedByUser){
    
        this.articles[index].likes.splice( this.articles[index].likes.indexOf(this.currentUser._id),1)
        console.log(this.articles[index].likes);
        
      }else{
        this.articles[index].likes.push(this.currentUser._id)
        this.sendLikeNotification(id ,auther)
      }
    })
  } 

  onSubmit(form :NgForm ){
    this.submitSearch =true
    console.log(this.itemToSearch);
  
    this.articleService.searchInOtherProfile(this.user._id,this.itemToSearch).subscribe((res : any)=>{
      this.articleSearched =res
     
      
    })
    
    } 
    openDialog(id :string , title :string , exist :any , auther : string , collabs : string[]) {
      this.notificationService.notificationTitle=title
      this.notificationService.notificationId = id
      this.notificationService.exist = exist ;
      this.notificationService.auther = auther
      this.notificationService.collabs = collabs
      
      this.dialog.open(AddCollaboratorsComponent)
    } 
  
  searchByTagInOtherProfile(tag :string){
    if(!this.searchedTags.includes(tag)){
      this.searchedTags.push(tag)      
      this.articleService.searchByTagInOtherProfile(this.searchedTags,this.user._id).subscribe(res=>{
        this.articles=res
        this.articles.forEach((article:any)=>{Object.assign(article ,{avg:this.calculAvregeRating(article.rating)})})

      })
    }
     
  }  
  report(id :string , title:string ) {
    this.notificationService.notificationTitle=title
    this.notificationService.notificationId = id
    this.dialog.open(ReportComponent)
  } 
  readLaterArticle(id :string){
    this.articleService.readLaterArticle(id ,this.currentUser.readLater.includes(id) ).subscribe(res=>{
      if(this.currentUser.readLater.includes(id) ){
        this.currentUser.readLater.splice(this.currentUser.readLater.indexOf(id),1) ;
        return
      }
        this.currentUser.readLater.push(id)
    })
  }
  attachUser(id:string ,attachUser :string[] , index :number){
    this.articleService.attachUser(id ,attachUser.includes(this.currentUser._id) ).subscribe(res=>{
      if(attachUser.includes(this.currentUser._id)){ 
      this.articles[index].attachedUsers.splice(attachUser.indexOf(this.currentUser._id),1);
        }else
        {
        this.articles[index].attachedUsers.push(this.currentUser._id)
      }
    })
   }

  deleteTag(tag :string){
    this.searchedTags.splice(this.searchedTags.indexOf(tag),1)
    if(this.searchedTags.length>0){
      this.articleService.searchByTagInOtherProfile(this.searchedTags ,this.user._id).subscribe(res=>{
        this.articles=res
      })
    }else{
      this.getOtherFinishArticles()
    }
   
  }
  deleteAllTags(){
    this.searchedTags=[]
    this.getOtherFinishArticles()
  }

  followUser(){
   this.userService.followUser(this.user._id).subscribe(res=>{
    console.log(res);
    this.user.followers.push(this.currentUser._id)
    this.sendNotification()
    
   })
  }
  unfollowUser(){
    this.userService.unfollowUser(this.user._id).subscribe(res=>{
     console.log(res);
     this.user.followers.splice(this.user.followers.indexOf(this.currentUser._id),1)
     
    })
   }
  followother(id :string , followers : string[]){
    this.userService.followUser(id).subscribe(res=>{
     console.log(res);
     followers.push(this.currentUser._id)
     this.sendNotificationForOther(id)
     
    })
   }
  getFollowers(){
    this.userService.getFollowings(this.user.followers).subscribe(res=>{
      this.followersOrFollowings=res
      console.log(this.followersOrFollowings);
      this.showFoloowersOrFollowings =true
      
    })
  }
  getFollowings(){
    this.userService.getFollowings(this.user.followings).subscribe(res=>{
      this.followersOrFollowings=res
      console.log(this.followersOrFollowings);
      this.showFoloowersOrFollowings =true

    })
  }
  visitProfil(id :string){
    this.showFoloowersOrFollowings =false
    this.router.navigate([`/visit/${id}`])
  }

  sendNotification(){
    console.log('i am sending now');
    
    const obj={
      sender : this.currentUser._id,
      recever : [this.user._id],
      senderIcon :this.currentUser.image,
      senderName : this.currentUser.name,
      type : 'follow',
    }
    this.notificationService.sendShareNotification(obj).subscribe(res=>{
      console.log('sdfqlksdf,kj');
      
      this.notificationService.socket.emit('sendFollowNotification' , this.user._id)
    })
  }
  sendNotificationForOther(id:string){
    console.log('i am sending now');
    
    const obj={
      sender : this.currentUser._id,
      recever : [id],
      senderIcon :this.currentUser.image,
      senderName : this.currentUser.name,
      type : 'follow',
    }
    this.notificationService.sendShareNotification(obj).subscribe(res=>{
      console.log('sdfqlksdf,kj');
      
      this.notificationService.socket.emit('sendFollowNotification' , id)
    })
  }
  sendLikeNotification(articleId :string , auther :string){
    console.log('i am sending now');
    
    const obj={
      sender : this.currentUser._id,
      recever : [auther],
      senderIcon :this.currentUser.image,
      senderName : this.currentUser.name,
      articleId : articleId,
      type : 'like',
    }
    this.notificationService.sendShareNotification(obj).subscribe(res=>{
      console.log('sdfqlksdf,kj');
      
      this.notificationService.socket.emit('sendFollowNotification' , auther)
    })
  }
}
