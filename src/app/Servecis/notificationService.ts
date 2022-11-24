import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    socket :any
    notificationId!:string
    notificationTitle!:string
    exist ! : boolean
    auther !  :string
    collabs! : string[]
constructor( private http: HttpClient , private router :Router) {

  this.showNotificationListener.subscribe(next=>{
    this.showNotificationListener2.next(next)
  })
}
showNotificationListener = new Subject<number>()
showNotificationListener2 = new Subject<number>()
deleteAllNotifications = new Subject()
sendNotification(obj :any){

  return   this.http.post('https://blog-in-opal.vercel.app/notification/send',obj)
}
getNotification(){

  return   this.http.get<[{isRead :boolean}]>('https://blog-in-opal.vercel.app/notification')
}
changeNotificationsReadStateTotrue(){
  return   this.http.get('https://blog-in-opal.vercel.app/notification/changeState')
}

changeAcceptedState(id:string){
  const obj={
    id:id
  }
  return   this.http.post('https://blog-in-opal.vercel.app/notification/changeAcceptedState',obj)
}
deleteNotification(){
  return   this.http.get('https://blog-in-opal.vercel.app/notification/deleteNotification')
}
sendShareNotification(obj :any){
  return   this.http.post('https://blog-in-opal.vercel.app/notification/sendShareNotification',obj)
}
}