import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hello: any;
  user: any;


  constructor() { }

  ngOnInit() {
    $('#getdata').on('click',function(e){
      e.preventDefault();
      });
  }

  getdata(){
    $.ajax({
    url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
    type: 'GET',
    dataType: 'json',
    data: this.hello,
    success: function (data, textStatus, xhr) {
    console.log(data);
    this.firstName = data.data;
    //this.router.navigate(['/dashboard']);
    },
    error: function (xhr, textStatus, errorThrown) {
    console.log('Error in Operation');
    }
    });
    
    }
}
