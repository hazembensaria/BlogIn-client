import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { articleService } from 'src/app/Servecis/articleService';

@Component({
  selector: 'app-articles-stats',
  templateUrl: './articles-stats.component.html',
  styleUrls: ['./articles-stats.component.css']
})
export class ArticlesStatsComponent implements OnInit {

  constructor(private articleService : articleService , private router : Router) { }
  articles : any
  ngOnInit(): void {
    
this.getFinishedArticle()

  }

  private getFinishedArticle(){
    this.articleService.getFinishArticles().subscribe(res=>{
      
      this.articles =res
      this.articles.map((val:any)=>{
        if(val.readTime>0)
        val.readTime = Math.round(val.readTime/60);
        else{
          val.readTime = 0
        }
        if(val.views.length)
       {
        if(this.isInt(val.readTime/val.views.length))
        val.avg = (val.readTime/val.views.length);
        else
        val.avg = (val.readTime/val.views.length).toFixed(2);
       }
        else{val.avg=0}
            })
    })
  }


  readArticle(id :string){
    this.router.navigate([`article/${id}`])
  }
  old :string ='1'
  markId(id : string){
  

   const oldelm = document.getElementById(`a${this.old}`)
  oldelm?.classList.remove('active')
  const elm = document.getElementById(`a${id}`)
  elm?.classList.add('active')

   this.old =id
  } 

  getCollaborationArticles(){
    this.markId('2')
    this.articleService.getCollabrationArticlesForStats().subscribe(res=>{
      this.articles =res
      this.articles.map((val:any)=>{
        if(val.readTime>0)
        val.readTime = Math.round(val.readTime/60);
        else{
          val.readTime = 0
        }
        if(val.views.length)
       {
        if(this.isInt(val.readTime/val.views.length))
        val.avg = (val.readTime/val.views.length);
        else
        val.avg = (val.readTime/val.views.length).toFixed(2);
       }
        else{val.avg=0}
            })
    })
  
  }
  isInt(n : number) {
    return n % 1 === 0;
 }
  getFinishsArticles(){
    this.markId('1')
   this.getFinishedArticle()

  } 

  not(){
    Notification.requestPermission().then(perm=>{
     if(perm ==='granted'){
      new Notification("example notification"),{
        body : 'this is more text',
        
      }
     }
    })
  }
}
