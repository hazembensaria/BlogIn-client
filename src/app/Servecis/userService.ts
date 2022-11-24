import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {Subject} from "rxjs";
import { userModel } from '../Models/UserModel';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    
constructor( private http: HttpClient , private router :Router) {}
 islogednow =false ;
 private userToken ! : string
 authListner=new Subject<boolean>();
 userChangedListener=new Subject();
 profilIconListner=new Subject<string>();
 userRole  ! : string 
createUser(email:string,password:string,name : string){
    const d = new Date()
    let day = d.getDate()
    let month = d.getMonth()+1
    let year = d.getFullYear()
    const fulldate=day+'-'+month+'-'+year
  const user={email:email,password:password,name:name ,formatDate :fulldate}
    console.log(user)
    this.http.post<{history : Array<string>, followings : Array<string>,followers :Array<string>,  profession : string,bio:string ,age :number,token:string, _id:string , role:string , isnew :boolean ,name :string , email :string ,image :string}>('https://blog-in-opal.vercel.app/user/signUp',user).subscribe(result=>{
        const currentuser : userModel = result
        console.log(currentuser);
        
        this.saveAuthData(currentuser.token )
        this.islogednow =true ;
        this.userToken = currentuser.token
        this.userRole = currentuser.role
        this.authListner.next(true);
      this.router.navigate(['profil'])
    })
  }
    //------------------------login---------------------------------
   loginUser(email:string,password:string){
    
        const auth={
            email:email,
            password:password
        }
        
         this.http.post<{history : Array<string>, followings : Array<string>,followers :Array<string>,  profession : string,bio:string ,age :number,token:string, _id:string , role:string  ,isnew : boolean ,name :string , email :string,image :string}>('https://blog-in-opal.vercel.app/user/login',auth)
         .subscribe(result=>{
              if(result.token){
                const user : userModel = result
                this.saveAuthData(user.token )
                this.islogednow =true ;
                this.userToken = user.token
                this.userRole = user.role
                console.log(this.userRole);
                
                this.authListner.next(true);
                this.router.navigate(['home'])
              }
            },
            err=>{
              console.log(err);
              
              if(err.error.message==="faild to connect here!")
              alert("faild to connect here!");
              if(err.error.message==="user not found")
              alert("user not found here!");
              
            })

          }


          accessDashbord(email:string,password:string){
            const auth={
                email:email,
                password:password
            }
             return this.http.post<{token :String}>('https://blog-in-opal.vercel.app/user/login',auth)
              }         
// --------------------------------saving data in local storage ----------------------------
private saveAuthData(token :string  ){
localStorage.setItem("token" ,token)
  }   
  
  private getAuthToken(){
    const token = localStorage.getItem("token")
    return token
  }

  autoAuthUser(){
    const authInformation = this.getAuthToken()

    if(authInformation){
        this.userToken = authInformation
      const now  = new Date()
      this.islogednow =true
      this.authListner.next(true);
      this.getUser()
    }
  }

  // ------------------------------------removing data from local storage---------------------------------
  private clearAuthData(){
    localStorage.removeItem("token")
  }


  logout(){
    this.clearAuthData()
    this.islogednow=false
    this.authListner.next(false);
    this.router.navigate(["/"])
  }

  public  getToken(){
    return this.userToken;
  }


  getUser(){

    return this.http.get<{history: Array<string>,readLater: Array<string>, followings : Array<string>,followers :Array<string>, profession : string,interest :Array<{name :string}>, bio:string ,age :number, role:string , image : string , _id :string , token : string , isnew  :boolean ,name :string , email :string }>('https://blog-in-opal.vercel.app/user')

  }
  
  getPopularUser(){

    return this.http.get('https://blog-in-opal.vercel.app/user/popular')

  }
  
  submitIcon(icon : string){
    const obj ={
      icon :icon
    }
    this.profilIconListner.next(icon)
    return this.http.post('https://blog-in-opal.vercel.app/user/changeIcon' ,obj)

  }

 searchUser(name :string){
  const obj ={
    name :name
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/searchUser' ,obj)

}

searchFreind(name :string){
  const obj ={
    name :name
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/searchFreind' ,obj)

}
 getUserById( id : string){
  const obj ={
    id :id
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/userById' ,obj)

 }

 upgradeProfile(user :any){
  return this.http.post('https://blog-in-opal.vercel.app/user/upgrade' ,user)
 }
 followUser(id : string){
  const obj ={
    id :id
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/followUser' ,obj)
 }

 unfollowUser(id : string){
  const obj ={
    id :id
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/unfollowUser' ,obj)
 }
 getFollowings(followers : string[] , nb? :number){
  const obj ={
    followers :followers
  }
  if(nb){
    const query = `?nbFreinds=${3*nb}`
  return this.http.post('https://blog-in-opal.vercel.app/user/followings'+query ,obj)
  }else{
      const query = `?nbFreinds=${3}`
      return this.http.post('https://blog-in-opal.vercel.app/user/followings'+query ,obj)

  }

 }

 getFollowersOrFollowings(array :string){
  const obj ={
    array :array
  }
  return this.http.post('https://blog-in-opal.vercel.app/user/getFollowersOrFollowings' ,obj)

}
setUserHistory(id:string , allRadyExist :boolean ){
  const obj ={
    id:id,
    allRadyExist:allRadyExist,
  }
return   this.http.post('https://blog-in-opal.vercel.app/user/setUserHistory',obj)
}  

orderUsersByPoints(){
  return this.http.get<{resul:any[] , index : number}>('https://blog-in-opal.vercel.app/user/orderUsersByPoints')
}
}
