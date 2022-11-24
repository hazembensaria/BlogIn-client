import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
 
  constructor() {
    Chart.register(...registerables);
   }
  
  ngOnInit(): void {
    


  //   const chart = new Chart('chart', {
  //     type: 'line',
  //     data: {
  //       labels:[1,2,3,4,5],
  //         datasets: [{
  //             data: [20,40,6,30,3],
  //             pointBackgroundColor:  '#009688',
  //             showLine: true,
  //             borderColor: 'rgb(75, 192, 192)',
  //             backgroundColor:'rgb(75, 192, 192)',
  //             tension:0.3,
  //             fill : {
  //               target: 'origin',
  //               above: 'rgba(75, 192, 192, 0.1)',   // Area will be red above the origin
            
                
  //             }
  //         },
  //         {
  //           data: [30,10,12,20,3],
  //           pointBackgroundColor:  '#009688',
  //           showLine: true,
  //           borderColor: 'rgb(210, 72, 75)',
  //           backgroundColor:'rgb(210, 72, 75)',
  //           tension:0.3,
  //           fill : {
  //             target: 'origin',
  //             above: 'rgba(210, 72, 75,0.1)',   // Area will be red above the origin
          
              
  //           }
  //       }]
          
  //     },
  //     options:{
  //     plugins:{
  //       legend:{
  //         display:true
  //       }
  //     }
  //     }
  // });

  }
 
}
