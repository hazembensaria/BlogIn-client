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
        
        return   this.http.post('http://localhost:7000/notes/save',obj)
      }   

      sendLink(obj :any){
        console.log(obj);
        
        return   this.http.post('http://localhost:7000/notes/saveLink',obj)
      }   


      geyNotes(obj :any){
        console.log(obj);
        
        return   this.http.post('http://localhost:7000/notes/get',obj)
      }   
      getLinks(obj :any){
        console.log(obj);
        
        return   this.http.post('http://localhost:7000/notes/getLinks',obj)
      }  
      deleteNote(obj :any){
        console.log(obj);
        
        return   this.http.post('http://localhost:7000/notes/delete',obj)
      }  
      deleteLink(obj :any){
        console.log(obj);
        
        return   this.http.post('http://localhost:7000/notes/deleteLink',obj)
      }  
}