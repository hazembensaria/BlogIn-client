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

  return   this.http.post('http://localhost:7000/notification/send',obj)
}
getNotification(){

  return   this.http.get<[{isRead :boolean}]>('http://localhost:7000/notification')
}
changeNotificationsReadStateTotrue(){
  return   this.http.get('http://localhost:7000/notification/changeState')
}

changeAcceptedState(id:string){
  const obj={
    id:id
  }
  return   this.http.post('http://localhost:7000/notification/changeAcceptedState',obj)
}
deleteNotification(){
  return   this.http.get('http://localhost:7000/notification/deleteNotification')
}
sendShareNotification(obj :any){
  return   this.http.post('http://localhost:7000/notification/sendShareNotification',obj)
}
}