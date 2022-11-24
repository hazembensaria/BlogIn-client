import { FF_EQUALS, H, O } from '@angular/cdk/keycodes';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import {io} from 'socket.io-client' ;
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AccessDashboardComponent } from '../dialog/access-dashboard/access-dashboard.component';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog : MatDialog,private userService : UserService , private notificationService :NotificationService , private route : Router) { }

isConnected = false
img ! :string
nbNotifications!: number
socket : any ;
showSettings:boolean =false
user:any
readonly uri : string = 'http://localhost:7000'
  ngOnInit(): void {
    this.notificationService.deleteAllNotifications.subscribe(res=>{
      this.nbNotifications =0
    })
    
    this.socket = io(`${this.uri}`)
    this.notificationService.socket =this.socket
    this.socket.on('aa', (a : string)=>console.log(a)
    )
    
    this.notificationService.socket?.on('getNotification', (obj  :string)=>{
      this.nbNotifications++ ;
    })
    this.notificationService.socket?.on('getFollowNotification', (obj  :string)=>{
      this.nbNotifications++ ;
    })

    
    this.notificationService.showNotificationListener2.subscribe(next=>{
      this.nbNotifications =next
    })
    this.isConnected = this.userService.islogednow
    this.userService.profilIconListner.subscribe(next=>{
      this.img= `../../../assets/images/${next}`
    })
    this.userService.authListner.subscribe(next=>{
      if(next)
      this.isConnected =true
      else{
        this.isConnected =false
      }
    })

    if(this.isConnected){
     this.loadUser()
    }
    
      else
      console.log('non conn');
      
      
  }
loadUser(){
  this.userService.getUser().subscribe(res=>{
    this.user=res
    this.socket.emit('newUser', res._id);
    this.img = `../../../assets/images/${res.image}`
    this.notificationService.getNotification().subscribe(note=>{
     this.nbNotifications = note.filter(v=>{ return v.isRead== false}).length
    })
  }) 
}

logout(){ 
  this.showSettings=false
this.userService.logout()

}
profile(){
  this.showSettings=false
  this.route.navigate(["profil"])
  
}
settings(){
  this.showSettings=false
  this.route.navigate(["settings"])
  
}
stat(){
  this.showSettings=false
  this.route.navigate(["stats"])
  
}
saves(){
  this.showSettings=false
  this.route.navigate(["saves"])
  
}
history(){
  this.showSettings=false
  this.route.navigate(["history"])
  
}
// dashboard(){
//   this.showSettings=false
//   this.route.navigate(["dashboard"])
  
// }
accessDashboard( ) {
  this.showSettings=false
  this.dialog.open(AccessDashboardComponent)
} 


func(){
  if(this.showSettings)
  this.showSettings=false
 
}
}
