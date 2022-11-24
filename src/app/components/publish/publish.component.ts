
import { ActivatedRoute, Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';
import { UserService } from 'src/app/Servecis/userService';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {
  @ViewChild('fruitInput') fruitInput !: ElementRef<HTMLInputElement> ;
  constructor(private toastr: ToastrService,private articleService : articleService , private route : ActivatedRoute , private userSrevice :UserService ,private router:Router ) { 
    
  }
  postId !:any
  section :any
  user : any
  title !: string
  isPublish!:boolean
  scheduleDate!:Date
  collaborators:any=[]
  date!:string
  showSchedule=false
  now=new Date()

  ngOnInit(): void {
    
    this.now.setMinutes(this.now.getMinutes() - this.now.getTimezoneOffset());
    this.date=this.now.toISOString().slice(0,16);
// console.log(this.now.toLocaleDateString("en-GB",{  year: "numeric",
// month: "2-digit",
// day: "2-digit",}));

// this.date= `${this.now.getFullYear().toString()}-${this.now.getDay().toString(2)}-${this.now.getMonth().toString()}T${this.now.getHours().toString()}:${this.now.getMinutes().toString()}`

    // console.log(this.date);
    
    this.userSrevice.getUser().subscribe(res=>{
      this.user = res
    })
    this.route.paramMap.subscribe(param=>{
      this.postId=param.get("id")
     
      if(this.postId){
        this.articleService.getArticle(this.postId).subscribe(article=>{
          console.log(article.sections);
          this.section =article.sections
          this.title =article.title;
          this.isPublish=article.isPublish;
          this.scheduleDate=article.scheduleDate; 
          this.collaborators=article.collaborators
          if(this.scheduleDate)
          this.date=this.scheduleDate.toString()     
        })
        
      }
    })
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  fruits: Fruit[] = [{name: 'Article'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  } 



  publishArticle(){
    this.articleService.publishArticle(this.postId , this.fruits).subscribe(res=>{
      console.log(res);
      this.toastr.success('everything is broken', 'Major Error', {
        timeOut: 3000,
      });
    })
  }



  shcedule(){
    const t1=this.date.split('T')
 const t2=t1[0].split('-')
 const t3=t1[1].split(':')

 const obj={
   year:t2[0],
   month:t2[1],
   day:t2[2],
   hour:t3[0],
   minute:t3[1],
   id:this.postId,
   tags:this.fruits,
   scheduleDate : this.date
 }
 console.log(obj);
    this.articleService.schedule(obj).subscribe(res=>{
      this.router.navigate([`edite/${this.postId}`])
      console.log(res);
      
    })
  }
  reshcedule(){
     console.log('her');
     const t1=this.date.split('T')
     const t2=t1[0].split('-')
     const t3=t1[1].split(':')
    
     const obj={
       year:t2[0],
       month:t2[1],
       day:t2[2],
       hour:t3[0],
       minute:t3[1],
       id:this.postId,
       tags:this.fruits,
       scheduleDate : this.date
     }
     console.log(obj);
    this.articleService.reschedule(obj).subscribe(res=>{
      this.router.navigate([`edite/${this.postId}`])
      console.log(res);
      
    })
  }
  cancelSchedule(){
    const obj={
      id:this.postId
    }
    this.articleService.cancelSchedule(obj).subscribe(res=>{
      this.showSchedule=false
      console.log(res);
      
    })
  }
}
