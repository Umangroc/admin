import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  hello: any;
  user: any;

  constructor(private router: Router) { }

  ngOnInit() {
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        var srnoa = 0;
        var srnob = 0;
        //console.log(res.data.data[0].firstName);
        $("table").html("<tr><th>S. No.</th><th>FirstName</th><th>LastName</th><th>Email</th><th>Service</th></tr>"); 
        do {
          $("table").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
          if (res.data.data[i].service == "advance") {
            srnoa++;
          }
          if (res.data.data[i].service == "basic") {
            srnob++;
          }
          srno++;
        i++;
        } while (i < 1000);
        $(".advance").text(srnoa);
        $(".basic").text(srnob);
      },
      error: function () {
        console.log('Error in Operation');
      }
    });
  
  }


  advancedata() {
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        //console.log(res.data.data[0].firstName);
        $("table").html("<tr><th>S. No.</th><th>FirstName</th><th>LastName</th><th>Email</th><th>Service</th></tr>");
        
        do {
            if (res.data.data[i].service == "advance") {
              $("table").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
            srno++;
            }
            i++;
          } while (i < 1000);
          return srno;
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  basicdata() {
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        //console.log(res.data.data[0].firstName);
        $("table").html("<tr><th>S. No.</th><th>FirstName</th><th>LastName</th><th>Email</th><th>Service</th></tr>");
          do {
            if (res.data.data[i].service == "Basic") {
              $("table").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
            srno++;
            }
            i++;
          } while (i < 1000);
          console.log(srno);
          
          return srno;
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  search(){
    $("#search").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $("table tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
