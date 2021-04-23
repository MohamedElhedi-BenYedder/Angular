import { MatSnackBar } from '@angular/material';
import { AdminService } from '../admin.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-add-rooms',
  templateUrl: './admin-add-rooms.component.html',
  styleUrls: ['./admin-add-rooms.component.css']
})
export class AdminAddRoomsComponent implements OnInit {
  rooms;
  newRoomNumber;
  constructor(public adminService: AdminService,private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getRoomAvailability();
    this.getNewRoomNumber();
  }


  getRoomAvailability(){
    this.rooms = [];
    this.adminService.getRoomAvailability().subscribe(results => {
      results.rooms.map(room => {
        this.rooms.push(room);
      });
    });
  }

  getNewRoomNumber(){
    this.adminService.getNewRoomNumber().subscribe(roomNumber =>{
      this.newRoomNumber = Number(roomNumber);
    });
  }

  onAddRoom(form:NgForm){

    if(form.invalid) {
      this.snackBar.open("Enter Valid Data","Ok");
    } else {
      const room= {
        roomNumber: this.newRoomNumber,
        type: form.value.type
      }
      this.adminService.addRoom(room).subscribe(response =>{
        this.snackBar.open('Room Added Successfully',"Ok");
        this.getNewRoomNumber();
        this.getRoomAvailability();
        form.reset();

      });
    }


  }
}
