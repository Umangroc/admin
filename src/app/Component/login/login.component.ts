import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
hello: any;

  constructor(private router: Router) { }

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
    this.router.navigate(['/dashboard']);
    },
    error: function () {
    console.log('Error in Operation');
    }
    });
    
    }
}
