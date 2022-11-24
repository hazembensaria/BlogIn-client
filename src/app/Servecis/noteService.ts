import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NoteService {


    constructor( private http: HttpClient , private router :Router) {

      }

    sendnotes(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/save',obj)
      }   

      sendLink(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/saveLink',obj)
      }   


      geyNotes(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/get',obj)
      }   
      getLinks(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/getLinks',obj)
      }  
      deleteNote(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/delete',obj)
      }  
      deleteLink(obj :any){
        console.log(obj);
        
        return   this.http.post('https://blog-in-opal.vercel.app/notes/deleteLink',obj)
      }  
}