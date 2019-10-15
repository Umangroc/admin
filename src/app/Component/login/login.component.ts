import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hello: any;

  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit() {
    $('#login').on('click',function(e){
      e.preventDefault();
      });
  }

  login(){
    
    this.hello = {
    email : $('#email').val(),
    password : $('#pwd').val(),
    }
    $.ajax({
    url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/adminLogin',
    type: 'POST',
    dataType: 'json',
    data: this.hello,
    success: (data) => {
    console.log(data);
    localStorage.setItem('id', data.id);   
       
    this.auth.sendToken(data.id);
    this.router.navigate(['/dashboard']);
    },
    error: function () {
    console.log('Error in Operation');
    }
    });
    
    }
}
