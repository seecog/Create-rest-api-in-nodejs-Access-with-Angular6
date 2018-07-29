import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private user : any = {};
  private users : any[]=[];
  constructor(private http : Http){

  }

  ngOnInit(){
    this.getUsers();
  }

getUsers(){
  this.http.get('http://localhost:3000/api/users').subscribe(
  (res)=>{
console.log('The response is ',res.json().data)
this.users = res.json().data;
  },
  (err)=>{
    console.log('The error is ',err)
  }
)
}

  saveUser(){
this.http.post('http://localhost:3000/api/users',this.user).subscribe(
  (res)=>{
console.log('The response is ',res)
this.getUsers();
this.user={};
  },
  (err)=>{
    console.log('The error is ',err)
  }
)
  }
}
