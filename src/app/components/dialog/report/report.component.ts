import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/Servecis/notificationService';
import { reportService } from 'src/app/Servecis/reportService';
import { UserService } from 'src/app/Servecis/userService';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
user:any
problems=['violance' , 'Harassment' , 'Self injury' , 'False information' , 'Hate speech' , 'Something Else']
selectedProblems:string[]= []
desc!:string
  constructor(private userSrevice :UserService , private notificationSerce :NotificationService , private reportService : reportService ) { }

  ngOnInit(): void {
    this.userSrevice.getUser().subscribe(res=>{
      this.user = res
     
    })
  }
  selectProblem(problem : string ){   
    if(this.selectedProblems.includes(problem)){ 
      this.selectedProblems.splice(this.selectedProblems.indexOf(problem),1)
    }else{
      this.selectedProblems.push(problem)
    }
    console.log(this.selectedProblems);
    
  }
  report(){
    const report={
      articleId:this.notificationSerce.notificationId,
      articleTitle:this.notificationSerce.notificationTitle,
      userIcone:this.user.image,
      userName:this.user.name,
      desc:this.desc,
      problems:this.selectedProblems

    }
    this.reportService.saveReport(report).subscribe(res=>{
      console.log(res);
      
    })
  }
}

// articleId :  {type:String,require:true},
    // articleTitle :  {type:String,require:true},
    // userIcone :{type:String,require:true},
    // userName :{type:String,require:true},
    // desc: {type:String},
    // problems:{type:Array,require:true},
    // date: { type: Date, default: Date.now },

