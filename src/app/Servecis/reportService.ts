import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class reportService {
    
constructor( private http: HttpClient , private router :Router) {}
saveReport(obj:any ){

   return this.http.post('https://blog-in-opal.vercel.app/report/save' ,obj)
}

getArticlesReported(){
    
    
    return   this.http.get('https://blog-in-opal.vercel.app/report/get')
  } 
  getReports(id:string){
    const obj={
        id:id
    }
    
    return   this.http.post('https://blog-in-opal.vercel.app/report/getReports',obj)
  } 
}