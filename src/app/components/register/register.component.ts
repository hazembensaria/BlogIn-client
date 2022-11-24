import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { UserService } from 'src/app/Servecis/userService';
import { BottomSheetOverviewExampleSheetComponent } from '../bottom-sheet-overview-example-sheet/bottom-sheet-overview-example-sheet.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService : UserService ,private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheetComponent>) { }

  ngOnInit(): void {
  }
  onSubmit(myForm:NgForm , event: MouseEvent){
    this._bottomSheetRef.dismiss();
    event.preventDefault();
    const user={
      email:myForm.value.email,
      name:myForm.value.name,
      password:myForm.value.password,
                }
    console.log(user);
    
this.userService.createUser(user.email ,user.password , user.name)
  }
  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
}
