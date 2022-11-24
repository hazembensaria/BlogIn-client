import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { articleService } from './Servecis/articleService';
import { NotificationService } from './Servecis/notificationService';
import { UserService } from './Servecis/userService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit {
  title = 'zone';
  notifications! : any
  readingArticle! :boolean
  isReading! :boolean
  constructor(private authservice : UserService ,private notificationService : NotificationService , private articleService :articleService) {
  }
  ngAfterViewInit(): void {
    this.notificationService.getNotification().subscribe(res=>{
      this.notifications =res     
    })
  }


// @HostListener('click')
// func(){
//   this.notificationService.showNotificationListener.next(false)
// }
  ngOnInit(): void {

   this.articleService.readingArticle.subscribe(next=>{
    this.readingArticle=next
   })  
  
    this.authservice.autoAuthUser()
  }
  playText(){
    this.articleService.isReading.next(true)
   
    if(speechSynthesis.paused && speechSynthesis.speaking){
      return speechSynthesis.resume()
    }
    speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(this.articleService.articleToRead)
    utterance.rate = 1;
    speechSynthesis.speak(utterance)
  }
  pausText(){
 
    if(speechSynthesis.speaking){
      this.articleService.isReading.next(false)
      speechSynthesis.pause()
    }
  }
  stopText(){
    this.articleService.readingArticle.next(false)
    this.articleService.isReading.next(false)
    speechSynthesis.resume()
    speechSynthesis.cancel()
  }

}
