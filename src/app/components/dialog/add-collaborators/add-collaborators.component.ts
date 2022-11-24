import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';

@Component({
  selector: 'app-add-collaborators',
  templateUrl: './add-collaborators.component.html',
  styleUrls: ['./add-collaborators.component.css']
})
export class AddCollaboratorsComponent implements OnInit {
  user :any =[]
  collaborators :any =[]
  followings: any =[]
  old:number =1
  freindToSearch!: string;
  constructor(private userSrevice :UserService , private notificationSerce :NotificationService  ) { }

  ngOnInit(): void {
      this.userSrevice.getUser().subscribe(res=>{
      this.user = res
      this.userSrevice.getFollowings(this.user.followings).subscribe(followings=>{
        this.followings =followings
        
      })
    })
  }
  autoSearchFreind(e : Event){
    if(this.freindToSearch)
  this.getSaerchedFreind()
  else{
    
    this.userSrevice.getFollowings(this.user.followings).subscribe(followings=>{
      this.followings =followings      
    })
  }

  } 
  getSaerchedFreind =this.debounce(()=>{
     
    this.userSrevice.searchFreind(this.freindToSearch).subscribe(res => {
      this.followings = res;
  
    })
        
          
    },300)
    
    debounce(cb :Function , delay:number){
      let timout:any
      return(...args:any)=>{
        clearTimeout(timout)
       timout = setTimeout(() => {
            cb(...args)
        }, delay);
      }
    }
  addCollaborator(collaborator : string ){   
    if(this.collaborators.includes(collaborator)){ 
      this.collaborators.splice(this.collaborators.indexOf(collaborator),1)
    }else{
      this.collaborators.push(collaborator)
    }
  }
  
  sendNotification(){
    const obj={
      sender : this.user._id,
      recever : this.collaborators,
      senderIcon :this.user.image,
      senderName : this.user.name,
      articleId : this.notificationSerce.notificationId,
      type : 'share',
      title:this.notificationSerce.notificationTitle,
      exist : this.notificationSerce.exist,
      auther : this.notificationSerce.auther , 
      collabs : this.notificationSerce.collabs
    }
    this.notificationSerce.sendShareNotification(obj).subscribe(res=>{
      this.notificationSerce.socket.emit('sendNotification' , this.collaborators)
    })
  }
  loadMoreFreinds(){
    this.old++
     this.userSrevice.getFollowings(this.user.followings,this.old).subscribe(followings=>{
       this.followings=followings;
     })
   }

}
