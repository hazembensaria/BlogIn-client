import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { articleService } from 'src/app/Servecis/articleService';
import { UserService } from 'src/app/Servecis/userService';

@Component({
  selector: 'app-standing-stats',
  templateUrl: './standing-stats.component.html',
  styleUrls: ['./standing-stats.component.css']
})
export class StandingStatsComponent implements OnInit {

  constructor(private articleService :articleService , private router :Router , private userService : UserService) {
    Chart.register(...registerables);
   }
    labels = ({count: 7});
 data = {
  labels: this.labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};
  ranking:any
  ordredUsers: any
  user: any
  standing! :number
  ngOnInit(): void {


    


    this.userService.getUser().subscribe(res=>{
      this.user =res     
    }) 
    this.articleService.rankingpoints().subscribe(res=>{
      console.log(res);
      this.ranking=res
      const dat= [res.views ,res.shares  ,res.likes]
      const lbs =['views' , 'shares' , 'likes']
      const config = new Chart ('chart',{
        type: 'bar',
        
        data:  {
          labels: lbs,
          datasets: [{
            label: 'Yout Points',
            data: dat,
            
            backgroundColor: [
             
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)'
            ],
            borderColor: [
            
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)'
            ],
            borderWidth: 1,
          
          }]
        },
        options: {
          // color :"#ffffff" ,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      });
      this.userService.orderUsersByPoints().subscribe(usrs=>{
        console.log(usrs);
        this.standing = usrs.index
        this.ordredUsers =usrs.resul;
        console.log(this.ordredUsers);
        
      })
      
    })
  }

}
