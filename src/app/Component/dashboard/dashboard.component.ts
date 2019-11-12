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
  questions: any;
  data = true;
  constructor(private router: Router) { }

  ngOnInit() {
    this.value();
    this.getdata();
  }

  value() {
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
        do {
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

  getdata() {
    this.data=true;
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        //console.log(res.data.data[0].firstName);
        $("#datatable tbody").empty()
        do {
          $("#datatable tbody").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
          srno++;
          i++;
        } while (i < res.data.data.length);
        return srno;
      },
      error: function () {
        console.log('Error in Operation');
      }
    });
  }

  advancedata() {
    this.data=true;
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        //console.log(res.data.data[0].firstName);
        $("#datatable tbody").empty()
        do {
          if (res.data.data[i].service == "advance") {
            $("#datatable tbody").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
            srno++;
          }
          i++;
        } while (i < res.data.data.length);
        return srno;
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  basicdata() {
    this.data=true;
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/user/getAdminUserList',
      type: 'GET',
      dataType: 'json',
      data: this.hello,
      success: (res) => {
        var i = 0;
        var srno = 1;
        //console.log(res.data.data[0].firstName);
        $("#datatable tbody").empty()
        do {
          if (res.data.data[i].service == "basic") {
            $("#datatable tbody").append("<tr><th>" + srno + ".</th><th>" + res.data.data[i].firstName + "</th><th>" + res.data.data[i].lastName + "</th><th>" + res.data.data[i].email + "</th><th>" + res.data.data[i].service + "</th></tr>");
            srno++;
          }
          i++;
        } while (i < res.data.data.length);
        console.log(srno);

        return srno;
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  search() {
    this.data=true;
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#databody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  request() {
    this.data=false;
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/getUnApprovedAnswer',
      type: 'GET',
      headers: { Authorization: localStorage.getItem('id') },
      dataType: 'json',
      success: (res) => {
        this.questions = res.data;
        console.log("questions....", this.questions);
        $("#datatable").empty();
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  approve(answerid) {
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/approve/' + answerid,
      type: 'POST',
      headers: { Authorization: localStorage.getItem('id') },
      dataType: 'json',
      success: (res) => {
        console.log(res);
        this.request();
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }

  reject(answerid) {
    $.ajax({
      url: 'http://fundoonotes.incubation.bridgelabz.com/api/questionAndAnswerNotes/reject/' + answerid,
      type: 'POST',
      headers: { Authorization: localStorage.getItem('id') },
      dataType: 'json',
      success: (res) => {
        console.log(res);
        this.request();
      },
      error: function () {
        console.log('Error in Operation');
      }
    });

  }
}
