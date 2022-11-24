import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  old :string ='1'
  markId(id : string){
  

   const oldelm = document.getElementById(`a${this.old}`)
  oldelm?.classList.remove('active')
  const elm = document.getElementById(`a${id}`)
  elm?.classList.add('active')

   this.old =id
  } 
}
