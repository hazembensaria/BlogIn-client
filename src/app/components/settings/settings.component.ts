import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userModel } from 'src/app/Models/UserModel';
import { UserService } from 'src/app/Servecis/userService';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  @ViewChild('fruitInput') fruitInput !: ElementRef<HTMLInputElement> ;
  constructor(private userService : UserService) { }
  img !: string
  imgBackUp !  : string
  user !: userModel
  showIcons =false
  addOnBlur = true;
readonly separatorKeysCodes = [ENTER, COMMA] as const;
fruits: Fruit[] = [];
  icons =['aptitude.png','blogger.png','bodybuilder.png','businessman.png','ceo.png','coach.png',
  'coding.png','eating.png','healthcare.png','lovers.png','mental-health.png','new.png','psychologist.png']
  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      console.log(res);
      this.user = res
      this.fruits =res.interest
      this.img = res.image
      this.imgBackUp = this.img
      console.log(this.img);
    })
  }
change(icon :string){
  this.img =  icon
}
changeIcon(){
  this.img = this.imgBackUp
  this.showIcons = !this.showIcons
}
submitIcon(){
this.userService.submitIcon(this.img).subscribe(res=>{
  console.log(res);

})
this.showIcons =false
}

onSubmit(myForm:NgForm ){
  const user={
    email:myForm.value.email,
    name:myForm.value.name,
    profession :myForm.value.profession,
    age : myForm.value.age,
    bio : myForm.value.bio,
    interest :this.fruits
              }
  console.log(user);
  this.userService.upgradeProfile(user).subscribe(res=>{
    console.log(res);
    
  })
  
}


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

}
