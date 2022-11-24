import { A } from '@angular/cdk/keycodes';
import { AfterContentInit, AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { commentService } from 'src/app/Servecis/commentService';
import { NoteService } from 'src/app/Servecis/noteService';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { UserService } from 'src/app/Servecis/userService';
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';
import { ReportComponent } from '../dialog/report/report.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit , AfterViewInit ,OnDestroy  {
  section = new Array(0)
  showMovingDiv =false
  postId : any
  title !: string
  article! : any
  tags : any
  rating =[1,2,3,4,5]
  nbStars :number=5
  isConnected =false
  userComment!: string
  comments:any=[]
  views:string[]=[]
  collaborators:any=[]
  links:any=[]
  user :any
  isReading:boolean =false
  obj !:number
  readTime :number=0
  interval :any
  showFollowers =false
 mentionOffset! :number|undefined
  followings:any=[]
  @ViewChild('ref') comElentRef! : ElementRef<HTMLElement>
  @ViewChild('sec') secElentRef! : ElementRef
  constructor(private noteService :NoteService ,  private notificationService:NotificationService ,  private router :Router,private commentService :commentService ,private notificationSerce :NotificationService ,public dialog: MatDialog , private route : ActivatedRoute , private articleService : articleService , private userService :UserService ) { }
 ngAfterViewInit(): void {
  this.article.rating.map((val:any)=>{
                
    if(val.id==this.user._id){
      this.obj=val.stars
      for(let i=1; i<=this.obj;i++){
        document.getElementById(`s${i}`)?.classList.add('text-amber-300', 'fa-solid')
    } }
    })
    this.interval= setInterval(()=>{
      this.readTime++
    },1000)
 }
 ngOnDestroy(): void {
  this.articleService.setReadTime(this.postId ,this.readTime).subscribe(res=>{
    clearInterval(this.interval)
   
  })
  
 
     
 }
  ngOnInit(): void { 
   
    this.articleService.isReading.subscribe(next=>{
      this.isReading=next
     })  
    this.isConnected = this.userService.islogednow
    if(this.isConnected){
      this.userService.getUser().subscribe(res=>{
        this.user =res 
        
        
        this.route.paramMap.subscribe(param=>{
          this.postId=param.get("id")
          console.log(this.user.history[this.user.history.length-1]);
          
            
            this.userService.setUserHistory(this.postId , this.user.history.includes(this.postId)).subscribe(res=>{
              console.log('true history');
            })
          
            this.articleService.getArticle(this.postId).subscribe(article=>{
           
              this.userService.getFollowings(article.collaborators).subscribe(res=>{
                this.collaborators=res
              })
             this.article =article
              this.section = article.sections.filter(value=>value!=='')
              this.tags = article.tags
              this.views = article.views
              this.articleService.setArticleViews(this.postId,this.views.includes(this.user._id) , this.article.auther , this.article.collaborators).subscribe(res=>{
                console.log('views added');
                
             })
             
              
              this.title =article.title;
              this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
                this.links =res
               
                
            })
            })
            this.commentService.getComments({articleId:this.postId}).subscribe(res=>{
              this.comments =res
              console.log(this.comments);
              
          }) 
          
        })
      }) 
    }

 
  }
rateArticle(stars :number){
  for(let i=1;i<=this.nbStars ;i++){
    document.getElementById(`s${i}`)?.classList.remove('text-amber-300', 'fa-solid')
   }
console.log(stars);
 for(let i=1;i<=stars ;i++){
  document.getElementById(`s${i}`)?.classList.add('text-amber-300', 'fa-solid')
 }
 this.nbStars=stars
 this.articleService.ratingArticle(this.postId , stars).subscribe(res=>{console.log(res);
 })
}


playText(){
  this.isReading=true
  this.articleService.readingArticle.next(true)
  if(speechSynthesis.paused && speechSynthesis.speaking){
    return speechSynthesis.resume()
  }
  speechSynthesis.cancel()
  let text =this.title
  this.section.forEach((val)=>{text+=val})
  this.articleService.articleToRead=text
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.rate = 1;
  speechSynthesis.speak(utterance)
}
pausText(){
  if(speechSynthesis.speaking){
    this.isReading=false
    speechSynthesis.pause()
  }
}
stopText(){
  this.isReading=false
  this.articleService.readingArticle.next(false)
  speechSynthesis.resume()
  speechSynthesis.cancel()
}
openDialog() {
  this.notificationSerce.notificationTitle=this.article.title
  this.notificationSerce.notificationId = this.postId
  this.dialog.open(AddCollaboratorsComponent)
}

focus(event : Event){
  (event.target as HTMLElement).classList.add('br')

}

blur(event : Event){
  (event.target as HTMLElement).classList.remove('br')
}
attachUser(id:string ,attachUser :string[] ){
  this.articleService.attachUser(id ,attachUser.includes(this.user._id) ).subscribe(res=>{
    if(attachUser.includes(this.user._id)){ 
    this.article.attachedUsers.splice(attachUser.indexOf(this.user._id),1);
      }else
      {
      this.article.attachedUsers.push(this.user._id)
    }
  })
 }
 report(id :string , title:string ) {
  this.notificationSerce.notificationTitle=title
  this.notificationSerce.notificationId = id
  this.dialog.open(ReportComponent)
} 
saveComment(){

  this.commentService.saveComment(this.user._id ,this.user.name ,this.user.image, this.comElentRef.nativeElement.innerText , this.postId).subscribe(res=>{
       console.log(res);
       this.sendNotification()
       this.commentService.getComments({articleId:this.postId}).subscribe(res=>{
        this.comments =res
      
        
    }) 
    
       
  })
  
}

likeComment(id :string , isLikedByUser : boolean  , index :number){
  console.log(id,isLikedByUser,index);
  
  this.commentService.likeComment(id , isLikedByUser).subscribe(res=>{
    if(isLikedByUser){
      this.comments[index].likes.splice( this.comments[index].likes.indexOf(this.user._id),1) 
    }else{
      this.comments[index].likes.push(this.user._id)
    }
  })
}
visitProfil(id :string){
  
  this.router.navigate([`/visit/${id}`])
}

mentionUser(){
  this.userService.getFollowings(this.user.followings).subscribe(res=>{
    this.followings=res
    this.showFollowers =true
  })
}
hideFollowers(){
  
  this.followings =[]
  this.showFollowers =false
}
appendUserMentionedName(name :string){
  // this.comElentRef.nativeElement.innerText?.slice(0, -1);
  
  // range.selectNodeContents(this.comElentRef.nativeElement);
  
  
  // const range = document.createRange();

  // this.comElentRef.nativeElement.innerHTML +=` ${name}`;
  // const a = `<span>${name}</span> `
 
  const first = this.comElentRef.nativeElement.textContent?.slice(0,  this.mentionOffset);
  const second = this.comElentRef.nativeElement.textContent?.slice( this.mentionOffset);
  this.comElentRef.nativeElement.innerText = first+name+second;
  this.comElentRef.nativeElement.focus();
  const main = this.comElentRef.nativeElement.childNodes[0]
  const start = this.comElentRef.nativeElement.childNodes[0]
  const end = this.comElentRef.nativeElement.childNodes [0]
  if(start.nodeValue){
    start.nodeValue = start.nodeValue?.trim();  
  }

  const range = document.createRange()
  if(this.mentionOffset){
    range.setStart(start,this.mentionOffset)
    range.setEnd(end,this.mentionOffset+name.length)
  }
  
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range)
  
  console.log(window.getSelection()?.getRangeAt(0).toString());
  const link  = document.createElement('a')
  // link.innerText = name  
  link.setAttribute('class' , 'bg-gray-200 jht')
  link.href ='dqfqsdf';
  // link.addEventListener('mouseover',()=>{console.log('mouseover');
  // link.addEventListener('mouseout' ,()=>{console.log('mouseleave');
  // })
  // })
  // link.innerText=name;
  
  // this.comElentRef.nativeElement.appendChild(link)  
  // console.log(window.getSelection()?.getRangeAt(0).toString());
  

  this.hideFollowers()
  
window.getSelection()?.getRangeAt(0).surroundContents(link);
console.log(this.comElentRef.nativeElement.innerHTML.length);
console.log(this.comElentRef.nativeElement.innerHTML);
console.log( this.mentionOffset);
}

@HostListener('click')
o(){
  this.hideFollowers()
}


focusdiv(e:Event){
  this.mentionOffset = document.getSelection()?.anchorOffset
  console.log(this.mentionOffset);
  
}
sendNotification(){
  console.log('i am sending now');
  
  const obj={
    sender : this.user._id,
    recever : [this.article.auther],
    senderIcon :this.user.image,
    senderName : this.user.name,
    articleId : this.article._id,
    type : 'comment',
  }
  this.notificationService.sendShareNotification(obj).subscribe(res=>{
    console.log('sdfqlksdf,kj');
    
    this.notificationService.socket.emit('sendFollowNotification' , this.article.auther)
  })
}

}