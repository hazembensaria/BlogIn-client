import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Observable, Subject, timer } from 'rxjs';
import { userModel } from 'src/app/Models/UserModel';
import { articleService } from 'src/app/Servecis/articleService';
import { UserService } from 'src/app/Servecis/userService';
import {MatDialog} from "@angular/material/dialog";
import { AddCollaboratorsComponent } from '../dialog/add-collaborators/add-collaborators.component';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { NoteService } from 'src/app/Servecis/noteService';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],

})
export class WriteComponent implements OnInit, AfterViewInit  {
  

  constructor(private toastr: ToastrService,private noteService :NoteService,private notificationService :NotificationService , private userSrevice : UserService , public dialog : MatDialog , private articleService : articleService , private route : ActivatedRoute , private router : Router) { }
user! : userModel 
elements  = document.getElementsByClassName('list');
Note :string | undefined =''
show =false
showLink =false
href!:string
title! :string|null
subTitle ! : string
nbSection  :number =0
section = new Array(this.nbSection)
showMovingDiv =false
itemToDelete : any
postId : any
saved :boolean =false
seconds !:number 
followings :any
collaborators :any =[]
newCollaborators :any =[]
articleCollaborators : any =[]
notes : any =[]
links : any =[]
projectDescription ! :string
articleAutherName!:string
articleAuther!:string
articleStat!:boolean
panelOpenState = false;
comment! :string
afkTime :number=0
interval :any
old = 1
freindToSearch!: string;
scheduleDate !: Date
formatDate!:string
p :any[]=[0]
// nu :any

@ViewChild('tooltip') comElentRef! : ElementRef
@ViewChild('myForm') formElentRef! : ElementRef
ngAfterViewInit(): void{
    // this.formElentRef.nativeElement.focus()
}
 toMonthName(monthNumber : number) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  // 👇️ using visitor's default locale
  return date.toLocaleString([], {
    month: 'long',
  });
}
  ngOnInit(): void {
    // this.notificationService.socket?.on('joined', (obj  :string)=>{
    //   this.toastr.success(`${obj} has joined this article `, 'New Collaborator!');

    // })

    this.notificationService.socket?.on('getArticleUpdated', (obj  :{title: string , section: string[]})=>{
    if(obj.section.length>this.p.length){
      this.p.push(obj.section.length-1)  
    } 
      this.title = obj.title
      this.section =obj.section
    })
    this.notificationService.socket?.on('getNotes', (obj:string)=>{
      this.noteService.geyNotes({articleId:this.postId}).subscribe(res=>{
        this.notes =res
 
        
    })
      })
      this.notificationService.socket?.on('getLinks', (obj:string)=>{
        this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
          this.links =res
         
          
      })
        })
        
      
      this.notificationService.socket?.on('NotesDeleted', (obj:string)=>{
        this.noteService.geyNotes({articleId:this.postId}).subscribe(res=>{
          this.notes =res
       
          
      })
        })
        this.notificationService.socket?.on('linksDeleted', (obj:string)=>{
          this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
            this.links =res
         
            
        })
          })
    this.notificationService.socket?.on('sectionDeleted', (obj  :{item : string})=>{
     console.log(obj.item);
     (document.getElementById(obj.item) as HTMLElement).style.display='none';
     this.section[parseInt(this.itemToDelete?.id.replace('i',''))]='';
    //  this.itemToDelete.classList.add('hidden')
    //  this.section[parseInt(this.itemToDelete.id.replace('i',''))]=''
      
    
    
    })
    this.userSrevice.getUser().subscribe(res=>{
      this.user = res
      this.userSrevice.getFollowings(this.user.followings).subscribe(followings=>{
        this.followings =followings
        
      })
    })

    this.route.paramMap.subscribe(param=>{
      this.postId=param.get("id")
      if(this.postId){
        this.saved =true
        this.articleService.getArticle(this.postId).subscribe(article=>{
          this.articleService.getCollaborators(article.collaborators).subscribe(collab=>{
            
              this.articleCollaborators =collab
          })
          this.collaborators =article.collaborators
          this.collaborators.push(article.auther)
          console.log(this.collaborators);
          this.articleAuther=article.auther
          this.articleStat =article.isPublish
         this.articleAutherName =article.autherName
         this.scheduleDate=article.scheduleDate
         if(this.scheduleDate){
          const t1=this.scheduleDate.toString().split('T')
          const t2=t1[0].split('-')
          const t3=t1[1].split(':')
          this.formatDate = `${t2[2]} ${this.toMonthName(parseInt(t2[1]))}, ${t2[0]} at ${t3[0]}:${t3[1]}`;
          
         }
          this.section = article.sections.filter(value=>value!=='')
         
          
          this.title =article.title;
         
          this.p =[]
          for(let i=0 ;i<this.section.length ; i++){
            this.p.push(i)
          }
         
          
          
          
        })
        this.noteService.geyNotes({articleId:this.postId}).subscribe(res=>{
            this.notes =res
            console.log(this.notes);
            
        })
        this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
          this.links =res
          console.log(this.links);
          
      })
      }
     
   
    })
  }

  loadMoreFreinds(){
    this.old++
     this.userSrevice.getFollowings(this.user.followings,this.old).subscribe(followings=>{
       this.followings=followings;
     })
   }

  autoSearchFreind(e : Event){
    if(this.freindToSearch)
  this.getSaerchedFreind()
  else{
    console.log('feragh');
    
    this.followings=[]
    this.userSrevice.getFollowings(this.user.followings).subscribe(followings=>{
      this.followings =followings
      
    })
  }

  } 



    autoSaveArticle(e : Event){
      this.notificationService.socket.emit('updateArticle' , {collab :this.collaborators , title: this.title , section :this.section})

    this.updateDebounceText((e.target as HTMLElement).textContent)

    } 

    debounce(cb :Function , delay:number){
      let timout:any
      return(...args:any)=>{
        clearTimeout(timout)
       timout = setTimeout(() => {
            cb(...args)
        }, delay);
      }
    }
     updateDebounceText =this.debounce((text :any)=>{
      if(this.postId){
            this.saved =false
            this.articleService.updateArticle(this.postId , this.title , this.section).subscribe(res=>{
              this.saved =true
            })
        
          }
    } , 2000)

    getSaerchedFreind =this.debounce(()=>{
     
    this.userSrevice.searchFreind(this.freindToSearch).subscribe(res => {
      this.followings = res;
  
    })
        
          
    },300)
    
  listen(event : MouseEvent){
    if(window.getSelection()?.toString()){
      
      this.Note=window.getSelection()?.toString()
      this.itemToDelete = (event.target as HTMLElement);
      //  this.Note =window.getSelection()?.toString();
      
        (document.getElementById("nn") as HTMLElement).style.display='flex';
        (document.getElementById("nn") as HTMLElement).style.top=`${(event.target as HTMLElement).offsetTop-50}px`;
        (document.getElementById("nn") as HTMLElement).style.left=`${(event.target as HTMLElement).offsetLeft+150}px`;
        this.showMovingDiv =true
      
    }
    else{
     this.hideNnElement()
      
    }
  }
  // onSubmit(form :NgForm ){

  //   this.userSrevice.searchFreind(this.freindToSearch).subscribe(res => {
  //     this.followings = res;
  
  //   })
 
    
  //   }

hideNnElement(){
  (document.getElementById("nn") as HTMLElement).style.display='none';
  this.showMovingDiv=false
}
focus(event : Event){
  (event.target as HTMLElement).classList.add('br')

}
focusInput(){

  (document.getElementById("i1") as HTMLElement).focus()
}

blur(event : Event){
  (event.target as HTMLElement).classList.remove('br')
}
  enter(event : Event){
      this.p.push(this.p.length)
      this.nbSection =1+this.nbSection
      setTimeout(() => {
        document.getElementById(`i${this.p.length-1}`)?.focus()
      }, 30);

  }
  enter1(event: Event){
    console.log(parseInt((event.target as HTMLElement).id.replace('i','')));
      
    this.p.push(this.p.length)
    this.nbSection =1+this.nbSection 
    console.log(this.section);
    
    setTimeout(() => {
      document.getElementById(`i${this.p.length-1}`)?.focus()
    }, 30);

  }

  showNote(){
    (document.getElementById("nn") as HTMLElement).style.display='none';
    this.show =true;
    // this.Note =window.getSelection()?.toString();
  }
  showlink(){
    (document.getElementById("nn") as HTMLElement).style.display='none';
    this.showLink =true;
    // this.Note =window.getSelection()?.toString();
  }
  deleteSection(){
    console.log(this.itemToDelete.id);
    
    this.itemToDelete.style.display='none';
    this.section[parseInt(this.itemToDelete.id.replace('i',''))]=''
    this.notificationService.socket.emit('deleteSection' , {collab :this.collaborators , item:this.itemToDelete.id})
  }
  saveArticle(){
    this.articleService.saveArticle(this.title , this.section ,this.user.name ,this.user.image )
  }
saveLink(){
  const obj={
    title:this.Note,
    href:this.href,
    sender:this.user._id,
    articleId: this.postId,
  }
  console.log(obj);
  
  this.noteService.sendLink(obj).subscribe(res=>{
   this.showLink=false
   this.notificationService.socket.emit('saveLink' , {collab :this.collaborators})
   this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
    this.links=res
    
})
  })
}

  publishArticle(){
 this.router.navigate([`/publish/${this.postId}`])
    
  }



  addCollaborator(collaborator : string ){   
    if(this.newCollaborators.includes(collaborator)){ 
      this.newCollaborators.splice(this.newCollaborators.indexOf(collaborator),1)
    }else{
      this.newCollaborators.push(collaborator)
    }
    
  }
  

  sendNotification(){
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    const fulldate=day+'-'+month+'-'+year
    const obj={
      sender : this.user._id,
      recever : this.newCollaborators,
      senderIcon :this.user.image,
      senderName : this.user.name,
      articleId : this.postId,
      title : this.projectDescription ,
      type : 'join',
      formatDate :fulldate 
    }
    this.notificationService.sendNotification(obj).subscribe(res=>{
      this.router.navigate(['profil'])
      this.toastr.success('your request send succefully','you can find your article saved in working on section ', {
        timeOut: 3000,
          
      });
      this.notificationService.socket.emit('sendNotification' , this.newCollaborators)
    })
  }
 saveNote(){
  const obj ={
    comment :this.comment,
    articleId: this.postId,
    senderIcon :this.user.image,
    senderName : this.user.name,
    title:this.Note,
  }
  console.log(obj);
  
this.noteService.sendnotes(obj).subscribe(res=>{
  this.show=false
  this.noteService.geyNotes({articleId:this.postId}).subscribe(res=>{
    this.notes =res   
})
this.notificationService.socket.emit('saveNote' , {collab :this.collaborators})

})

 }
 watch(e : Event , n :number){
  
  this.section[n] = (e.target as HTMLElement).textContent

  const range = document.createRange()
    const sel = window.getSelection()
    if((e.target as HTMLElement).childNodes.length>0){
     let el2 = (e.target as HTMLElement).childNodes[(e.target as HTMLElement).childNodes.length - 1];
     range.setStartAfter(el2);
    }else{
      range.setStartAfter((e.target as HTMLElement));
    }
    range.collapse(true);
      sel?.removeAllRanges();
      sel?.addRange(range);
   

  //     this.nu =(e.target as HTMLElement).childNodes[0].textContent?.length
  //     range.setStart((e.target as HTMLElement).childNodes[0], this.nu)
  //   range.collapse(true)
  //   if(sel){
  //     sel.removeAllRanges()
  //     sel.addRange(range)
  //   }
   
 }
 watchTitel(e : Event ){
  this.title = (e.target as HTMLElement).textContent
  // const range = document.createRange()
  // const sel = window.getSelection()
  //   this.nu =(e.target as HTMLElement).childNodes[0].textContent?.length
  //   range.setStart((e.target as HTMLElement).childNodes[0], this.nu)
  // range.collapse(true)
  // if(sel){
  //   sel.removeAllRanges()
  //   sel.addRange(range)
  // }
 }

//   link() {
//   if (window.getSelection()?.toString()) {

    
//     var a = document.createElement('a');
//     a.href = 'http://www.google.com';
   
//     a.setAttribute('class' , 'bg-gray-200 avatar relative text-green-500 ')
//     a.setAttribute('data-tooltip' , 'http://www.google.com' )
//     a.setAttribute('data-tooltip-position' , 'bottom')
//     a.setAttribute('data-tooltip-type',"link")
//     a.setAttribute('contenteditable',"true")
//     a.addEventListener('mouseover',(e : Event)=>{
//       console.log('over');
//       this.comElentRef.nativeElement.style.display='flex';
//       this.comElentRef.nativeElement.style.top=`${(e.target as HTMLElement).offsetTop}px`;
//       this.comElentRef.nativeElement.style.left=`${(e.target as HTMLElement).offsetLeft}px`;
//       this.comElentRef.nativeElement.style.transform='translateX(-50%) translateY(-110%)';
//       console.log((e.target as HTMLElement).offsetTop , (e.target as HTMLElement).offsetLeft);
      
      
//     })
//     a.addEventListener('mouseout',()=>{
//       this.comElentRef.nativeElement.style.display='none';
//     })
//     window.getSelection()?.getRangeAt(0).surroundContents(a);
//     console.log(window.getSelection()?.getRayngeAt(0));
    
//   }
// }
toast(){
  this.toastr.success('Hello world!', 'Toastr fun!');
}

deleteNote(id:string){
  const obj={
    id:id
  }
  this.noteService.deleteNote(obj).subscribe(res=>{
    this.notificationService.socket.emit('deleteNote' , {collab :this.collaborators})
    this.noteService.geyNotes({articleId:this.postId}).subscribe(res=>{
      this.notes =res
      
  })
    
  })
}

deleteLink(id:string){
  const obj={
    id:id
  }
  this.noteService.deleteLink(obj).subscribe(res=>{
    this.notificationService.socket.emit('deleteLink' , {collab :this.collaborators})
    this.noteService.getLinks({articleId:this.postId}).subscribe(res=>{
      this.links=res
      
  })
    
  })
}
}
