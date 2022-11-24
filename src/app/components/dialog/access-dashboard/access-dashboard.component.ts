import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Servecis/userService';

@Component({
  selector: 'app-access-dashboard',
  templateUrl: './access-dashboard.component.html',
  styleUrls: ['./access-dashboard.component.css']
})
export class AccessDashboardComponent implements OnInit {

  constructor(private userService : UserService , private router : Router) { }
user:any
  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      this.user=res;
    })
  }
onSubmit(form : NgForm){
 
  this.userService.accessDashbord(this.user.email , form.value.password).subscribe(res=>{
   if(res.token){
    this.router.navigate(['dashboard'])
   }
    
  })
}
}
