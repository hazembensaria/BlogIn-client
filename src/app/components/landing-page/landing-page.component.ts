import { Component, HostListener, OnInit } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  scroll=false
  panelOpenState = false;
  fields=['sport' , 'helth' ,'developement' , 'food' , 'music']
  questions=['sport' , 'helth' ,'developement' , 'food' , 'music']
  caption = 'where you share  experience.'
  constructor(private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheetComponent);
  }
  


  @HostListener("document : scroll")
  scrollTop(){
    // if(document.documentElement.scrollTop>0)
    // this.authservice.scroll.next( true)
    // else
    // this.authservice.scroll.next( false)
  
    if(document.documentElement.scrollTop>170){
      this.scroll=true
  
  
    }
    else{
     
      
      this.scroll=false
  
    }
  
  
  
  
  }
}
 



