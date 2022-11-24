import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { articleService } from 'src/app/Servecis/articleService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.css']
})
export class SavingsComponent implements OnInit {

  constructor( private notificationService:NotificationService ,   private toastr: ToastrService,private userService :UserService,public dialog : MatDialog,private notificationSerce:NotificationService,private articleService : articleService , private router : Router) { }
finishArticles : any
unfinishArticles :any
user:any
showUnfinishArticles =false
followersOrFollowings :any=[]
showFoloowersOrFollowings:boolean=false
  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      this.user =res
    })
    this.articleService.getFinishArticles().subscribe(res=>{
      console.log(res);
      this.finishArticles =res
    })
  }
  getUnfinishArticles(){
    this.markId('2')
    this.articleService.getUnfinishArticles().subscribe(res=>{
      this.finishArticles =res
      // this.showUnfinishArticles =true
      // document.getElementById('a2')?.classList.add('border-b-2', 'border-solid', 'border-b-amber-400')
    })
    }
    getFinishsArticles(){
      this.markId('1')
      this.articleService.getFinishArticles().subscribe(res=>{
        console.log(res);
        this.finishArticles =res
      })
      this.showUnfinishArticles=false
    } 
    getCollaborationArticles(){
      this.markId('3')
      this.articleService.getCollabrationArticles().subscribe(res=>{
        console.log(res);
        this.finishArticles =res
      })
      this.showUnfinishArticles=false
    } 
    
    editeArticle(id : string){
      this.router.navigate([`edite/${id}`])
    }
old :string ='1'
   markId(id : string){
   

    const oldelm = document.getElementById(`a${this.old}`)
   oldelm?.classList.remove('active')
   const elm = document.getElementById(`a${id}`)
   elm?.classList.add('active')

    this.old =id
   } 

   openDialog(id :string , title :string , exist :any , auther : string , collabs : string[]) {
    this.notificationSerce.notificationTitle=title
    this.notificationSerce.notificationId = id
    this.notificationSerce.exist = exist ;
    this.notificationSerce.auther = auther
    this.notificationSerce.collabs = collabs
    
    this.dialog.open(AddCollaboratorsComponent)
  } 

  stat(){
    
    this.router.navigate(["stats"])
    
  }
  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
  deleteArticle(id :string ,index :number){
    this.articleService.deleteArticle(id).subscribe(res=>{
      this.finishArticles.splice(index,1);
      this.toastr.info('deleted succefully!');

      
    })
  }
  switchCommentStat(id :string ,stat :boolean , index :number){
    this.finishArticles[index].commentDisabled=!stat
    this.articleService.switchCommentStat(id,stat).subscribe(res=>{
      if(stat)
     { this.toastr.success('Comments turned on succefully for this article!');
     return}
      this.toastr.success('Comments turned off succefully for this article!');
      
    })
  }

  getFollowers(){
    this.userService.getFollowings(this.user.followers).subscribe(res=>{
      this.followersOrFollowings=res
      this.showFoloowersOrFollowings =true
      
    })
  }
  getFollowings(){
    this.userService.getFollowings(this.user.followings , 5).subscribe(res=>{
      this.followersOrFollowings=res
      this.showFoloowersOrFollowings =true

    })
  }

  followother(id :string , followers : string[]){
    this.userService.followUser(id).subscribe(res=>{
     console.log(res);
     followers.push(this.user._id)
     this.sendNotificationForOther(id)
     
    })
   }

   visitProfil(id :string){
    this.showFoloowersOrFollowings =false
    this.router.navigate([`/visit/${id}`])
  }
  sendNotificationForOther(id:string){
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
