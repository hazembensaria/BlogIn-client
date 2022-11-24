import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/Servecis/userService';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent> , private userService : UserService) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm, event: MouseEvent){
    this._bottomSheetRef.dismiss();
    // event.preventDefault();
    const user={email:myForm.value.email,password:myForm.value.password}
    console.log(user);
    
    this.userService.loginUser(user.email,user.password)
    this.userService.userChangedListener.next(Math.random())
    
  }
}
